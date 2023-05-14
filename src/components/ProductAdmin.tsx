import { For, createResource } from "solid-js";
import { supabase } from "../App";
import ProductRow from "./ProductRow";
import Row from "./Row";
import Popover from "./Popover";

function ProductAdmin() {
  const addProduct = async (e: any) => {
    e.preventDefault();
    const { data, error } = await supabase.from("products").insert({
      product_name: e.target.product_name.value,
      expiration_days: e.target.expiration_days.value,
    });
    if (error) console.log("error", error);
  };
  const getProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) console.log("error", error);
    return data;
  };
  const deleteFromProducts = async (id: number) => {
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);
    if (error) console.log("error", error);
    refetchProducts();
  };
  const [products, { mutate: mutateProducts, refetch: refetchProducts }] =
    createResource(getProducts);
  return (
    <>
      <h1>ProductAdmin</h1>
      <form onSubmit={(e) => e.preventDefault()}></form>
      <table class="table-auto">
        <tbody>
          <tr>
            <th>Produkt</th>
            <th>Hållbarhet dagar</th>
          </tr>
          <For each={products()}>
            {(row) => {
              return (
                <Row
                  onDelete={() => {
                    deleteFromProducts(row.id);
                  }}
                  onUpdate={() => {
                    console.log("update");
                  }}
                >
                  <ProductRow
                    expirationDays={row.expiration_days}
                    name={row.product_name}
                  />
                </Row>
              );
            }}
          </For>
        </tbody>
      </table>
    </>
  );
}
export default ProductAdmin;
