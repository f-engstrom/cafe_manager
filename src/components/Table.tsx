import { createStore } from "solid-js/store";
import { Row } from "./Row";
import { For, createResource } from "solid-js";
import { setFutureDate } from "../utils/helpers";
import { Product } from "../models/models";
import { createClient } from "@supabase/supabase-js";
import { Database } from "../models/supabase";

const createRow = (productName: number) => {
  const date = new Date();
  switch (productName) {
    case 1:
      console.log("hej");
      return {
        id: 1,
        name: "Chokladboll",
        addedDate: Date.now(),
        expirationDate: date.setDate(date.getDate() + 7),
      };
    case 2:
      return {
        id: 2,
        name: "Kaka",
        addedDate: Date.now(),
        expirationDate: date.setDate(date.getDate() + 10),
      };
  }
};

export function Table() {
  const [form, setForm] = createStore<FormFields>({
    id: 0,
    addedDate: "",
    expirationDate: "",
  });
  const updateFormField = (fieldName: string) => (event: Event) => {
    const inputElement = event.currentTarget as HTMLInputElement;
    console.log(fieldName, inputElement.value);
    if (fieldName === "id") {
      setForm({
        [fieldName]: parseInt(inputElement.value),
      });
      return;
    }

    setForm({
      [fieldName]: inputElement.value,
    });
  };

  // const [rows, setRows] = createStore<Product[]>([]);

  const supabaseUrl = "https://jwajghgfcoyqgvanwhwl.supabase.co";
  // const supabaseKey = process.env.SUPABASE_KEY;
  const supabase = createClient<Database>(
    supabaseUrl,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3YWpnaGdmY295cWd2YW53aHdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM5NjE4NTAsImV4cCI6MTk5OTUzNzg1MH0.7eIle3K4ik5nYm3ZbBGwKJ2XakRWdPpBZdaT4Ia39RU"
  );

  const getFromExpiraton = async () => {
    const { data, error } = await supabase.from("product_expiration")
      .select(`*, products (
      product_name
    )`);
    if (error) console.log("error", error);
    return data;
  };
  const getProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) console.log("error", error);
    return data;
  };
  interface NewProduct {
    product: number;
    exp_date: string;
    start_date: string;
    note: string;
  }
  const addProduct = async ({
    product,
    exp_date,
    start_date,
    note,
  }: NewProduct) => {
    console.log(product);
    const { data, error } = await supabase
      .from("product_expiration")
      .insert({ product, exp_date, start_date, note });
    if (error) console.log("error", error);
    refetch();
  };
  const [data, { mutate, refetch }] = createResource(getFromExpiraton);
  const [products, { mutate: mutateProducts, refetch: refetchProducts }] =
    createResource(getProducts);
  // add useEffect and add products to set rows store
  // useEffect(() => {

  return (
    <>
      <form
        class="py-4 mb-8 bg-slate-400 flex flex-col gap-2 justify-center"
        onSubmit={(event: Event) => {
          event.preventDefault();
          addProduct({
            product: event.target.product.value,
            exp_date: event.target.expirationDate.value,
            start_date: event.target.addedDate.value,
            note: event.target.note.value,
          });
        }}
      >
        <div class="flex justify-center">
          <select
            class="mr-2"
            name="product"
            id="product"
            onChange={updateFormField("id")}
          >
            <option value="">Välj Produkt</option>
            <For each={products()}>
              {(product) => (
                <option value={product.id}>{product.product_name}</option>
              )}
            </For>
          </select>
          <div class="flex gap-2 bg-slate-300 mr-4">
            <input
              type="date"
              id="start"
              name="addedDate"
              onChange={updateFormField("addedDate")}
            />
            <input
              type="date"
              id="end"
              name="expirationDate"
              //   disabled
              value={setFutureDate(form.addedDate, 7)}
              onChange={updateFormField("expirationDate")}
            />
          </div>
        </div>
        <div>
          <textarea name="note" id="note"></textarea>
        </div>
        <div>
          <button class=" bg-green-200" type="submit">
            <span class="p-2"> Lägg till rad</span>{" "}
          </button>
        </div>
      </form>
      <table class="table-auto">
        <tbody>
          <tr>
            <th>Id</th>
            <th>Produkt</th>
            <th>Uttagen</th>
            <th>Utgångsdatum</th>
            <th>Anteckning</th>
          </tr>
          <For each={data()}>
            {(row) => {
              console.log("row", row);
              return (
                <Row
                  id={row.id}
                  expirationDate={row.exp_date}
                  addedDate={row.start_date}
                  name={row.products.product_name}
                  note={row.note}
                />
              );
            }}
          </For>
        </tbody>
      </table>
    </>
  );
}
