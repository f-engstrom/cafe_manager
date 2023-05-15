import { For, createResource, createSignal } from "solid-js";
import ProductRow from "./ProductRow";
import Popover from "./Popover";
import { getProducts } from "../lib/supabase";
import Table from "./Table";
import AddProduct from "./AddProduct";

function ProductAdminView() {
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
        <AddProduct
          onAddOrUpdate={() => {
            refetchProducts();
            setAddRowPopoverOpeOpen(false);
            setProduct(null);
          }}
          product={product()}
        />
      </Popover>
      <Table
        heading="Produkter"
        buttonText="Lägg till ny produkt"
        onClick={() => {
          setAddRowPopoverOpeOpen(!addRowPopoverOpen());
        }}
        tableHeadings={["Produkt", "Hållbarhet dagar"]}
        rows={
          <For each={products()}>
            {(row) => {
              return (
                <ProductRow
                  onClick={() => {
                    setProductAndOpen(row);
                  }}
                  expirationDays={row.expiration_days}
                  name={row.product_name}
                />
              );
            }}
          </For>
        }
      />
    </>
  );
}
export default ProductAdminView;
