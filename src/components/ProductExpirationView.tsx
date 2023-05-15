import ExpirationRow from "./ExpirationRow";
import { For, createResource, createSignal } from "solid-js";
import AddUpdateDeleteExpirationRow from "./AddExpirationRow";
import Popover from "./Popover";
import Button from "./Button";
import { getFromExpiraton, getProducts } from "../lib/supabase";
import Table from "./Table";

function ProductExpirationView() {
  const [data, { mutate, refetch: refetchFromExpiration }] =
    createResource(getFromExpiraton);
  const [products, { mutate: mutateProducts, refetch: refetchProducts }] =
    createResource(getProducts);
  const [addRowPopoverOpen, setAddRowPopoverOpeOpen] = createSignal(false);
  const [product, setProduct] = createSignal<any>(null);
  const setProductAndOpen = (row: any) => {
    console.log(row);

    setProduct(row);
    setAddRowPopoverOpeOpen(true);
  };

  return (
    <>
      <Popover
        heading="Lägg till produkt"
        open={addRowPopoverOpen()}
        onClose={() => {
          setAddRowPopoverOpeOpen(false);
          setProduct(null);
        }}
      >
        <AddUpdateDeleteExpirationRow
          onAdd={refetchFromExpiration}
          products={products()}
          product={product()}
        />
      </Popover>
      <Table
        heading="Framtaget"
        buttonText="Lägg till ny rad"
        onClick={() => {
          setAddRowPopoverOpeOpen(!addRowPopoverOpen());
        }}
        tableHeadings={[
          "Status",
          "Id",
          "Produkt",
          "Uttagen",
          "Utgångsdatum",
          "Anteckning",
        ]}
        rows={
          <For each={data()}>
            {(row) => {
              return (
                <ExpirationRow
                  onClick={() => {
                    setProductAndOpen(row);
                  }}
                  id={row.id}
                  expirationDate={row.exp_date}
                  addedDate={row.start_date}
                  name={row.products.product_name}
                  note={row.note}
                />
              );
            }}
          </For>
        }
      />
    </>
  );
}
export default ProductExpirationView;
