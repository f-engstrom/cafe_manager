//add row component

import { For, createResource } from "solid-js";
import { setFutureDate } from "../utils/helpers";
import { createStore } from "solid-js/store";
import { supabase } from "../App";
import { FormFields, NewProduct } from "../models/models";

interface Props {
  onAdd: () => void;
}
function AddRow({ onAdd }: Props) {
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
  const getProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) console.log("error", error);
    return data;
  };

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
    onAdd();
  };
  const [products, { mutate: mutateProducts, refetch: refetchProducts }] =
    createResource(getProducts);
  return (
    <div>
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
          <label for="product">Produkt</label>
          <select
            name="product"
            id="product"
            class="mr-2"
            onChange={updateFormField("id")}
          >
            <option value="0">Välj produkt</option>
            <For each={products()}>
              {(product) => (
                <option value={product.id}>{product.product_name}</option>
              )}
            </For>
          </select>
          <div class="flex gap-2 bg-slate-300 mr-4">
            <label for="start">Uttagen</label>
            <input
              type="date"
              id="start"
              name="addedDate"
              onChange={updateFormField("addedDate")}
            />

            <label for="end">Utgångsdatum</label>
            <input
              type="date"
              id="end"
              name="expirationDate"
              value={setFutureDate(form.addedDate, 7)}
              onChange={updateFormField("expirationDate")}
            />
          </div>
        </div>
        <div>
          <label for="note">Anteckning</label>
          <textarea name="note" id="note"></textarea>
        </div>
        <div>
          <button type="submit">Lägg till rad</button>
        </div>
      </form>
      {/* <form>
        <div class="flex justify-center">
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
              value={setFutureDate(form.addedDate, 7)}
              onChange={updateFormField("expirationDate")}
            />
          </div>
        </div>

        <div>
          <button class=" bg-green-200" type="submit">
            <span class="p-2"> Lägg till rad</span>{" "}
          </button>
        </div>
      </form> */}
    </div>
  );
}

export default AddRow;
