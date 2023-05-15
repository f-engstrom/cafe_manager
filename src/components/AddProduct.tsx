import { createSignal } from "solid-js";
import { addProduct, updateProduct, deleteProduct } from "../lib/supabase";
import Button from "./Button";

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

  const [loading, setLoading] = createSignal<boolean>(false);

  return (
    <form
      class="flex flex-col h-full gap-4 mt-4"
      onSubmit={async (event: Event) => {
        event.preventDefault();
        setLoading(true);
        if (!props.product) {
          const res = await addProduct({
            product_name: event.target.productName.value,
            expiration_days: event.target.expirationDays.value,
          });
          console.log("mjau bror", res);
        } else {
          await updateProduct({
            id: props.product.id,
            product_name: event.target.productName.value,
            expiration_days: event.target.expirationDays.value,
          });
        }
        setLoading(false);
        onAddOrUpdate();
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
                await deleteProduct(props.product.id);
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
export default AddProduct;
