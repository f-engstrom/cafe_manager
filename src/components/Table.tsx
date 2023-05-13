import { createStore } from "solid-js/store";
import { Row } from "./Row";
import { For, createResource } from "solid-js";
import { setFutureDate } from "../utils/helpers";
import { Product } from "../models/models";
import { createClient } from "@supabase/supabase-js";

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
  const supabase = createClient(
    supabaseUrl,
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3YWpnaGdmY295cWd2YW53aHdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM5NjE4NTAsImV4cCI6MTk5OTUzNzg1MH0.7eIle3K4ik5nYm3ZbBGwKJ2XakRWdPpBZdaT4Ia39RU"
  );

  const getProducts = async (): Promise<Product[]> => {
    const { data, error } = await supabase.from("Product expiration")
      .select(`*, Products (
      product_name
    )`);
    if (error) console.log("error", error);
    return data;
  };
  const [data, { mutate, refetch }] = createResource<Product[]>(getProducts);
  // add useEffect and add products to set rows store
  // useEffect(() => {
  console.log("data", data());

  return (
    <>
      <form
        class="pb-4"
        onSubmit={(event: Event) => {
          event.preventDefault();
          console.log(
            event.currentTarget.elements,
            event.target.addedDate.value,
            event.target.expirationDate.value
          );

          console.log(form, createRow(form.id));
          //   setRows([...rows, createRow(form.id)]);
        }}
      >
        <select
          class="mr-2"
          name="product"
          id="product"
          onChange={updateFormField("id")}
        >
          <option value="">Välj Produkt</option>
          <option value="1">Cholkladboll</option>
          <option value="2">Kaka</option>
        </select>
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
        <button class=" bg-green-200" type="submit">
          <span class="p-2"> Lägg till rad</span>{" "}
        </button>
      </form>
      <table class="table-auto">
        <tbody>
          <tr>
            <th>Id</th>
            <th>Produkt</th>
            <th>Uttagen</th>
            <th>Utgångsdatum</th>
          </tr>
          <For each={data()}>
            {(row) => {
              console.log("row", row);
              return (
                <Row
                  id={row.id}
                  expirationDate={row.exp_date}
                  addedDate={row.start_date}
                  name={row.Products.product_name}
                />
              );
            }}
          </For>
        </tbody>
      </table>
    </>
  );
}
