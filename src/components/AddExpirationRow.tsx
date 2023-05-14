//add row component

import { For, createResource } from "solid-js";
import { setFutureDate } from "../utils/helpers";
import { createStore } from "solid-js/store";
import { supabase } from "../App";
import { FormFields, NewProduct } from "../models/models";
import Button from "./Button";

interface Props {
  onAdd: () => void;
}
function AddExpirationRow({ onAdd }: Props) {
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
  const [products, { mutate: mutateProducts, refetch: refetchProducts }] =
    createResource(getProducts);

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
  return (
    <form
      class="flex flex-col h-full gap-4 mt-4"
      onSubmit={(event: Event) => {
        event.preventDefault();
        console.log(
          event.target.product.value,
          event.target.expirationDate.value,
          event.target.addedDate.value,
          event.target.note.value
        );

        addProduct({
          product: event.target.product.value,
          exp_date: event.target.expirationDate.value,
          start_date: event.target.addedDate.value,
          note: event.target.note.value,
        });
      }}
    >
      <div class="flex flex-col items-start">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          for="product"
        >
          Produkt:
        </label>
        <select
          name="product"
          id="product"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={updateFormField("id")}
        >
          <option value="0">Välj produkt</option>
          <For each={products()}>
            {(product) => (
              <option value={product.id}>{product.product_name}</option>
            )}
          </For>
        </select>
      </div>
      <div class="flex justify-between ">
        <div class="flex flex-col items-start">
          <label class="mb-2" for="start">
            Uttagen:
          </label>
          <input
            type="date"
            id="start"
            name="addedDate"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={updateFormField("addedDate")}
          />
        </div>
        <div class="flex flex-col items-start">
          <label class="mb-2" for="end">
            Utgångsdatum:
          </label>
          <input
            type="date"
            id="end"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="expirationDate"
            value={setFutureDate(form.addedDate, 7)}
            onChange={updateFormField("expirationDate")}
          />
        </div>
      </div>
      <div class="flex flex-col items-start">
        <label
          for="note"
          class="mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Anteckning:
        </label>
        <textarea
          id="note"
          name="note"
          rows="4"
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>
      </div>
      <div class="mt-auto mb-8">
        <Button variant="primary" type="submit">
          Lägg till produkt
        </Button>
      </div>
    </form>
  );
}

export default AddExpirationRow;
