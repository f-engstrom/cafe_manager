//add row component

import { For, createSignal } from "solid-js";
import { setFutureDate, timeOut } from "../../utils/helpers";
import { createStore } from "solid-js/store";
import { FormFields, Product, ProductRow } from "../../models/models";
import Button from "../Button";
import {
  addToExpiration,
  requestDeleteFromExpiraton,
  updateExpiration,
} from "../../lib/supabase";
import Alert from "../Alert";

interface Props {
  onAddOrUpdate: () => void;
  products: Product[] | undefined;
  product: ProductRow;
}
function AddUpdateDeleteExpirationRow(props: Props) {
  const { onAddOrUpdate } = props;
  const addOrUpdate = () => {
    onAddOrUpdate();
    setStatus({ error: "", success: "", done: false });
  };
  const [form, setForm] = createStore<FormFields>({
    startDate: props.product?.start_date,
    expirationDate: props.product?.exp_date,
    selectedProduct: props.products?.find(
      (product) => product.id === props.product?.product
    ),
  });

  const [status, setStatus] = createStore({
    error: "",
    success: "",
    done: false,
    loadingAdd: false,
    loadingDelete: false,
  });
  const updateFormField = (fieldName: string) => (event: Event) => {
    console.log("plonk", fieldName);

    const inputElement = event.currentTarget as HTMLInputElement;
    if (fieldName === "startDate") {
      setForm({
        startDate: inputElement.value,
        expirationDate: setFutureDate(
          inputElement.value,
          form.selectedProduct?.expiration_days
        ),
      });
    }
    if (fieldName === "selectedProduct") {
      const selectedProduct = props.products?.find(
        (product) => product.id === parseInt(inputElement.value, 10)
      );

      setForm({
        selectedProduct: selectedProduct,
        expirationDate: setFutureDate(
          form.startDate,
          selectedProduct?.expiration_days
        ),
      });
    }
  };

  const deleteFromExpiration = async () => {
    setStatus({ loadingDelete: true });
    const res = await requestDeleteFromExpiraton(props.product.id);
    setStatus({ loadingDelete: false });
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
        class="mt-4 flex h-full flex-col gap-4"
        onSubmit={async (event: Event) => {
          event.preventDefault();
          setStatus({ loadingAdd: true });
          let res;
          if (!props.product) {
            res = await addToExpiration({
              product: event.target.product.value,
              exp_date: event.target.expirationDate.value,
              start_date: event.target.startDate.value,
              note: event.target.note.value,
            });
            setStatus({ loadingAdd: false });
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
              });
              await timeOut(2000);
              addOrUpdate();
            }
          } else {
            res = await updateExpiration({
              id: props.product.id,
              product: event.target.product.value,
              exp_date: event.target.expirationDate.value,
              start_date: event.target.startDate.value,
              note: event.target.note.value,
            });
            setStatus({ loadingAdd: false });
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
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            for="product"
          >
            Produkt:
          </label>
          <select
            name="product"
            id="product"
            required
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            onChange={updateFormField("selectedProduct")}
            disabled={props.product ? true : false}
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
              name="startDate"
              required
              disabled={form?.selectedProduct ? false : true}
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              onChange={updateFormField("startDate")}
              value={form.startDate}
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
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              name="expirationDate"
              value={form.expirationDate}
              disabled
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
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            value={props.product?.note ? props.product.note : ""}
          ></textarea>
        </div>
        <div class="mb-8 mt-auto ">
          <div class="flex justify-center gap-x-2">
            <Button variant="primary" type="submit" loading={status.loadingAdd}>
              {props.product ? "Uppdatera produkt" : "Lägg till produkt"}
            </Button>
            {props.product && (
              <Button
                variant="danger"
                type="button"
                loading={status.loadingDelete}
                onClick={deleteFromExpiration}
              >
                Ta bort produkt
              </Button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}

export default AddUpdateDeleteExpirationRow;
