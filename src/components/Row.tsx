import clsx from "clsx";
import { formatDate } from "../utils/helpers";
import { Product } from "../models/models";

export function Row({ id, name, expirationDate, addedDate }: Product) {
  console.log("mamma", name);

  const today = new Date().setHours(0, 0, 0, 0);
  const expirationDay = new Date(expirationDate).setHours(0, 0, 0, 0);
  console.log(today === expirationDay, today, expirationDay);
  return (
    <tr
      class={clsx(
        "odd:bg-white even:bg-slate-50",
        expirationDay < today && "!bg-red-500",
        expirationDay === today && "!bg-orange-500"
      )}
    >
      <td>{id}</td>
      <td>{name}</td>
      <td>{formatDate(addedDate)}</td>
      <td>{formatDate(expirationDate)}</td>
    </tr>
  );
}
