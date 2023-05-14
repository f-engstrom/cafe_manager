//add row component

import { For, createResource } from "solid-js";
import { setFutureDate } from "../utils/helpers";
import { createStore } from "solid-js/store";
import { supabase } from "../App";
import { FormFields, NewProduct } from "../models/models";
import Button from "./Button";

interface Props {
  onUpdate: () => void;
  products: {
    created_at: string | null;
    expiration_days: number | null;
    id: number;
    product_name: string | null;
  }[];
  product: unknown;
}
function UpdateExpirationRow(props: Props) {
  const { onUpdate, product } = props;
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
  const updateExpiration = async ({
    id,
    product,
    exp_date,
    start_date,
    note,
  }) => {
    const { data, error } = await supabase
      .from("product_expiration")
      .update({ exp_date, start_date, note, product })
      .eq("id", id);
    if (error) console.log("error", error);
    onUpdate();
  };
  return (
    <form
      class="flex flex-col h-full gap-4 mt-4"
      onSubmit={(event: Event) => {
        event.preventDefault();
        console.log("mor", {
          id: product.id,
          product: event.target.product.value,
          exp_date: event.target.expirationDate.value,
          start_date: event.target.addedDate.value,
          note: event.target.note.value,
        });

        updateExpiration({
          id: product.id,
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
          value={product.product}
        >
          <option value="0">Välj produkt</option>
          <For each={props.products}>
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
            value={product.start_date}
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
          value={product.note}
          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></textarea>
      </div>
      <div class="mt-auto mb-8">
        <Button variant="primary" type="submit">
          Uppdatera produkt
        </Button>
        <Button variant="danger" type="submit">
          ta bort produkt
        </Button>
      </div>
    </form>
  );
}

export default UpdateExpirationRow;
