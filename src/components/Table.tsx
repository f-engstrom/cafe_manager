import { createStore } from "solid-js/store";
import { Row } from "./Row";
import { For, createResource } from "solid-js";
import { setFutureDate } from "../utils/helpers";
import { supabase } from "../App";
import { FormFields, NewProduct } from "../models/models";
import AddRow from "./AddRow";

export function Table() {
  const getFromExpiraton = async () => {
    console.log("wohoo");

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

  return (
    <>
      <AddRow onAdd={refetch} />
      <table class="table-auto">
        <tbody>
          <tr>
            <th>Id</th>
            <th>Produkt</th>
            <th>Uttagen</th>
            <th>Utgångsdatum</th>
            <th>Anteckning</th>
          </tr>
          <For each={data()}>
            {(row) => {
              return (
                <Row
                  id={row.id}
                  expirationDate={row.exp_date}
                  addedDate={row.start_date}
                  name={row.products.product_name}
                  note={row.note}
                  onDelete={() => {
                    deleteFromExpiraton(row.id);
                  }}
                />
              );
            }}
          </For>
        </tbody>
      </table>
    </>
  );
}
