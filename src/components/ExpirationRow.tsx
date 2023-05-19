import clsx from "clsx";
import { ProductRow } from "../models/models";

interface Props extends ProductRow {
  onClick: () => void;
  name: string | null;
}

function ExpirationRow({
  id,
  name,
  exp_date,
  start_date,
  note,
  onClick,
}: Props) {
  const today = new Date().setHours(0, 0, 0, 0);
  const expirationDay = new Date(exp_date).setHours(0, 0, 0, 0);
  return (
    <tr class="hover:bg-purple-200 border-t border-gray-300" onClick={onClick}>
      <td class="flex justify-center py-4 pl-4 pr-3 sm:pl-3">
        <div
          class={clsx(
            "rounded-full w-4 h-4 my-auto",
            expirationDay > today && "!bg-green-500",
            expirationDay < today && "!bg-red-600",
            expirationDay === today && "!bg-yellow-500"
          )}
        ></div>
      </td>
      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
        {id}
      </td>
      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
        {name}
      </td>
      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
        {start_date}
      </td>
      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
        {exp_date}
      </td>
      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
        {note}
      </td>
    </tr>
  );
}

export default ExpirationRow;
