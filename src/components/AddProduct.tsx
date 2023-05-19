import { createSignal } from "solid-js";
import {
  addProduct,
  updateProduct,
  requestDeleteProduct,
} from "../lib/supabase";
import Button from "./Button";
import Alert from "./Alert";
import { timeOut } from "../utils/helpers";
import { createStore } from "solid-js/store";

interface Props {
  onAddOrUpdate: () => void;
  product:
    | {
        created_at: string | null;
        expiration_days: number | null;
        id: number;
        product_name: string | null;
      }
    | null
    | undefined;
}

function AddProduct(props: Props) {
  const { onAddOrUpdate } = props;
  const addOrUpdate = () => {
    onAddOrUpdate();
    setStatus({ error: "", success: "", done: false });
  };

  const [status, setStatus] = createStore({
    error: "",
    success: "",
    done: false,
    loadingAdd: false,
    loadingDelete: false,
  });
  const deleteProduct = async () => {
    setStatus({ loadingDelete: true });
    const res = await requestDeleteProduct(props.product?.id || 0);
    setStatus({ loadingDelete: false });
    console.log(res);
    if (res.error) {
      if (res.error.code === "23503") {
        setStatus({
          error: "Produkten används i en eller flera expirationer",
          success: "",
          done: true,
        });
      } else {
        setStatus({
          error: "Något gick fel",
          success: "",
          done: true,
        });
      }
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
          setStatus({ loadingAdd: true });
          let res;
          if (!props.product) {
            res = await addProduct({
              product_name: event.target.productName.value,
              expiration_days: event.target.expirationDays.value,
            });
            setStatus({ loadingAdd: false });
            if (res.error) {
              setStatus({ error: "Något gick fel", success: "", done: true });
            } else {
              setStatus({ error: "", success: "Produkt tillagd", done: true });
              await timeOut(2000);
              addOrUpdate();
            }
          } else {
            res = await updateProduct({
              id: props.product.id,
              product_name: event.target.productName.value,
              expiration_days: event.target.expirationDays.value,
            });
            setStatus({ loadingAdd: false });
            if (res.error) {
              setStatus({ error: "Något gick fel", success: "", done: true });
            }
            setStatus({ error: "", success: "Produkt uppdaterad", done: true });
            await timeOut(2000);
            addOrUpdate();
          }
        }}
      >
        <div class="flex flex-col items-start">
          <label class="text-sm">Produkt</label>
          <input
            class="border border-gray-300 rounded-md p-2"
            type="text"
            name="productName"
            value={props.product?.product_name || ""}
            required
          />
        </div>
        <div class="flex flex-col items-start">
          <label class="text-sm">Hållbarhet</label>
          <input
            class="border border-gray-300 rounded-md p-2"
            type="number"
            name="expirationDays"
            value={props.product?.expiration_days}
            required
          />
        </div>

        <div class="mt-auto mb-8">
          <div class="flex gap-x-2">
            <Button variant="primary" type="submit" loading={status.loadingAdd}>
              {props.product ? "Uppdatera produkt" : "Lägg till produkt"}
            </Button>
            {props.product && (
              <Button
                variant="danger"
                type="button"
                loading={status.loadingDelete}
                onClick={deleteProduct}
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
export default AddProduct;
