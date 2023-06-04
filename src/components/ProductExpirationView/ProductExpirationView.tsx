import ExpirationRow from "../ExpirationRow";
import { For, createResource, createSignal } from "solid-js";
import AddUpdateDeleteExpirationRow from "./AddExpirationRow";
import Popover from "../Popover";
import { getFromExpiraton, getProducts } from "../../lib/supabase";
import Table from "../Table";
import { sortAndGroup } from "../../utils/helpers";

function ProductExpirationView() {
  const [data, { mutate, refetch: refetchFromExpiration }] =
    createResource(getFromExpiraton);
  const [products, { mutate: mutateProducts, refetch: refetchProducts }] =
    createResource(getProducts);
  const [addRowPopoverOpen, setAddRowPopoverOpeOpen] = createSignal(false);
  const [product, setProduct] = createSignal<any>(null);
  const setProductAndOpen = (row: any) => {
    setProduct(row);
    setAddRowPopoverOpeOpen(true);
  };

  const sortedProducts = () => sortAndGroup(data());

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
        {addRowPopoverOpen() && (
          <AddUpdateDeleteExpirationRow
            onAddOrUpdate={() => {
              refetchFromExpiration();
              setAddRowPopoverOpeOpen(false);
              setProduct(null);
            }}
            products={products()}
            product={product()}
          />
        )}
      </Popover>

      <Table
        heading="Framtaget"
        buttonText="Lägg till ny rad"
        loading={!sortedProducts()}
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
          <For each={sortedProducts()}>
            {(row) => {
              return (
                <>
                  <tr class="border-t border-gray-200">
                    <th
                      colspan="6"
                      scope="colgroup"
                      class="bg-purple-700 py-2 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-3"
                    >
                      {row.name}
                    </th>
                  </tr>
                  <For each={row.products}>
                    {(row) => {
                      return (
                        <ExpirationRow
                          onClick={() => {
                            setProductAndOpen(row);
                          }}
                          id={row.id}
                          exp_date={row.exp_date}
                          start_date={row.start_date}
                          name={row?.products?.product_name}
                          note={row.note}
                        />
                      );
                    }}
                  </For>
                </>
              );
            }}
          </For>
        }
      />
    </>
  );
}
export default ProductExpirationView;
