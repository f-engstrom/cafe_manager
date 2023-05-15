//add row component

import { For, createSignal } from "solid-js";
import { setFutureDate } from "../utils/helpers";
import { createStore } from "solid-js/store";
import { FormFields } from "../models/models";
import Button from "./Button";
import {
  addToExpiration,
  deleteFromExpiraton,
  updateExpiration,
} from "../lib/supabase";

interface Props {
  onAddOrUpdate: () => void;
  products:
    | {
        created_at: string | null;
        expiration_days: number | null;
        id: number;
        product_name: string | null;
      }[]
    | null
    | undefined;
  product: {
    created_at: string | null;
    exp_date: string | null;
    id: number;
    note: string | null;
    product: number | null;
    start_date: string | null;
    products:
      | {
          product_name: string | null;
        }
      | {
          product_name: string | null;
        }[]
      | null;
  };
}
function AddUpdateDeleteExpirationRow(props: Props) {
  const { onAddOrUpdate } = props;
  const [form, setForm] = createStore<FormFields>({
    id: 0,
    addedDate: "",
    expirationDate: "",
  });
  const [loading, setLoading] = createSignal<boolean>(false);
  const [selectedProduct, setSelectedProduct] = createSignal();
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

  return (
    <form
      class="flex flex-col h-full gap-4 mt-4"
      onSubmit={async (event: Event) => {
        event.preventDefault();
        setLoading(true);
        if (!props.product) {
          const res = await addToExpiration({
            product: event.target.product.value,
            exp_date: event.target.expirationDate.value,
            start_date: event.target.addedDate.value,
            note: event.target.note.value,
          });
          console.log("mjau bror", res);
        } else {
          await updateExpiration({
            id: props.product.id,
            product: event.target.product.value,
            exp_date: event.target.expirationDate.value,
            start_date: event.target.addedDate.value,
            note: event.target.note.value,
          });
        }
        setLoading(false);
        onAddOrUpdate();
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
          onChange={(e) => {
            setSelectedProduct(
              props.products.find(
                (product) => product.id === parseInt(e.currentTarget.value)
              )
            );
          }}
          value={props.product?.product}
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
            value={props.product?.start_date}
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
            value={setFutureDate(
              form.addedDate,
              selectedProduct()?.expiration_days
            )}
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
          value={props.product?.note ? props.product.note : ""}
        ></textarea>
      </div>
      <div class="mt-auto mb-8">
        <div class="flex gap-x-2">
          <Button variant="primary" type="submit" loading={loading()}>
            {props.product ? "Uppdatera produkt" : "Lägg till produkt"}
          </Button>
          {props.product && (
            <Button
              variant="danger"
              type="button"
              loading={loading()}
              onClick={async () => {
                setLoading(true);
                await deleteFromExpiraton(props.product.id);
                setLoading(false);
                onAddOrUpdate();
              }}
            >
              ta bort produkt
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}

export default AddUpdateDeleteExpirationRow;
