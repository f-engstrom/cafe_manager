import ExpirationRow from "./ExpirationRow";
import { For, createResource, createSignal } from "solid-js";
import { supabase } from "../App";
import AddExpirationRow from "./AddExpirationRow";
import Row from "./Row";
import Popover from "./Popover";
import clsx from "clsx";
import Button from "./Button";
import UpdateExpirationRow from "./UpdateExpirationRow";

export function Table() {
  const getFromExpiraton = async () => {
    const { data, error } = await supabase.from("product_expiration")
      .select(`*, products (
      product_name
    )`);
    if (error) console.log("error", error);
    return data;
  };
  const [data, { mutate, refetch: refetchFromExpiration }] =
    createResource(getFromExpiraton);
  const getProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) console.log("error", error);
    return data;
  };
  const [products, { mutate: mutateProducts, refetch: refetchProducts }] =
    createResource(getProducts);
  const deleteFromExpiraton = async (id: number) => {
    const { data, error } = await supabase
      .from("product_expiration")
      .delete()
      .eq("id", id);
    if (error) console.log("error", error);
    refetchFromExpiration();
  };
  const updateExpiration = async (id: number, exp_date: string) => {
    const { data, error } = await supabase
      .from("product_expiration")
      .update({ exp_date })
      .eq("id", id);
    if (error) console.log("error", error);
    refetchFromExpiration();
  };
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
        {product() ? (
          <UpdateExpirationRow
            onUpdate={refetchFromExpiration}
            products={products()}
            product={product()}
          />
        ) : (
          <AddExpirationRow
            onAdd={refetchFromExpiration}
            products={products()}
          />
        )}
      </Popover>
      <div class="flex justify-end mb-6">
        <Button
          variant="primary"
          onClick={() => {
            setAddRowPopoverOpeOpen(!addRowPopoverOpen());
          }}
        >
          Lägg till ny rad
        </Button>
      </div>
      <table class="table-auto">
        <tbody>
          <tr>
            <th>Status</th>
            <th>Id</th>
            <th>Produkt</th>
            <th>Uttagen</th>
            <th>Utgångsdatum</th>
            <th>Anteckning</th>
          </tr>
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
        </tbody>
      </table>
    </>
  );
}
