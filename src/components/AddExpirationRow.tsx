//add row component

import { For, createSignal, onCleanup } from "solid-js";
import { setFutureDate, timeOut } from "../utils/helpers";
import { createStore } from "solid-js/store";
import { FormFields } from "../models/models";
import Button from "./Button";
import {
  addToExpiration,
  requestDeleteFromExpiraton,
  updateExpiration,
} from "../lib/supabase";
import Alert from "./Alert";

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
  const addOrUpdate = () => {
    onAddOrUpdate();
    setStatus({ error: "", success: "", done: false });
  };
  const [form, setForm] = createStore<FormFields>({
    id: 0,
    addedDate: "",
    expirationDate: "",
  });
  const [selectedProduct, setSelectedProduct] = createSignal();
  const [status, setStatus] = createStore({
    error: "",
    success: "",
    done: false,
    loading: false,
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
  onCleanup(() => {
    console.log("unmount");
  });
  const deleteFromExpiration = async () => {
    setStatus({ loading: true });
    const res = await requestDeleteFromExpiraton(props.product.id);
    setStatus({ loading: false });
    if (res.error) {
      setStatus({
        error: res.error.message,
        success: "",
        done: true,
      });
    } else {
      setStatus({
        error: "",
        success: "Produkt borttagen",
        done: true,
      });
      await timeOut(2000);
      addOrUpdate();
    }
  };

  return (
    <>
      {status.done && !status.error && (
        <Alert
          message={status.success}
          type="success"
          heading="Allt gick bra!"
          className="mt-4"
        />
      )}
      {status.done && status.error && (
        <Alert
          message={status.error}
          type="error"
          heading="Något gick fel!"
          className="mt-4"
        />
      )}
      <form
        class="flex flex-col h-full gap-4 mt-4"
        onSubmit={async (event: Event) => {
          event.preventDefault();
          setStatus({ loading: true });
          let res;
          if (!props.product) {
            res = await addToExpiration({
              product: event.target.product.value,
              exp_date: event.target.expirationDate.value,
              start_date: event.target.addedDate.value,
              note: event.target.note.value,
            });
            setStatus({ loading: false });
            if (res.error) {
              setStatus({
                error: "Något gick fel",
                success: "",
                done: true,
              });
            } else {
              setStatus({
                error: "",
                success: "Produkt tillagd",
                done: true,
                loading: false,
              });
              await timeOut(2000);
              addOrUpdate();
            }
          } else {
            res = await updateExpiration({
              id: props.product.id,
              product: event.target.product.value,
              exp_date: event.target.expirationDate.value,
              start_date: event.target.addedDate.value,
              note: event.target.note.value,
            });
            setStatus({ loading: false });
            if (res.error) {
              setStatus({
                error: "Något gick fel",
                success: "",
                done: true,
              });
            } else {
              setStatus({
                error: "",
                success: "Produkt uppdaterad",
                done: true,
              });
              await timeOut(2000);
              addOrUpdate();
            }
          }
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
            required
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
              required
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
              required
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
        <div class="mt-auto mb-8 ">
          <div class="flex gap-x-2 justify-center">
            <Button variant="primary" type="submit" loading={status.loading}>
              {props.product ? "Uppdatera produkt" : "Lägg till produkt"}
            </Button>
            {props.product && (
              <Button
                variant="danger"
                type="button"
                loading={status.loading}
                onClick={deleteFromExpiration}
              >
                ta bort produkt
              </Button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}

export default AddUpdateDeleteExpirationRow;
