import clsx from "clsx";
import { Product } from "./Table";
import { formatDate } from "../utils/helpers";

export function Row({ id, name, expirationDate, addedDate }: Product) {
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
