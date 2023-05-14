import ExpirationRow from "./ExpirationRow";
import { For, createResource, createSignal } from "solid-js";
import { supabase } from "../App";
import AddExpirationRow from "./AddExpirationRow";
import Row from "./Row";
import Popover from "./Popover";
import clsx from "clsx";
import Button from "./Button";

export function Table() {
  const getFromExpiraton = async () => {
    const { data, error } = await supabase.from("product_expiration")
      .select(`*, products (
      product_name
    )`);
    if (error) console.log("error", error);
    return data;
  };
  const deleteFromExpiraton = async (id: number) => {
    const { data, error } = await supabase
      .from("product_expiration")
      .delete()
      .eq("id", id);
    if (error) console.log("error", error);
    refetch();
  };
  const [data, { mutate, refetch }] = createResource(getFromExpiraton);
  const [addRowPopoverOpen, setAddRowPopoverOpeOpen] = createSignal(false);

  return (
    <>
      <Popover
        heading="Lägg till produkt"
        open={addRowPopoverOpen()}
        onClose={() => {
          setAddRowPopoverOpeOpen(false);
        }}
      >
        <AddExpirationRow onAdd={refetch} />
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
