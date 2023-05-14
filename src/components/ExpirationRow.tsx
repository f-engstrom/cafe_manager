import clsx from "clsx";

interface Props {
  id: number;
  name: string;
  expirationDate: string;
  addedDate: string;
  note: string;
  onClick: () => void;
}

function ExpirationRow({
  id,
  name,
  expirationDate,
  addedDate,
  note,
  onClick,
}: Props) {
  const today = new Date().setHours(0, 0, 0, 0);
  const expirationDay = new Date(expirationDate).setHours(0, 0, 0, 0);
  return (
    <tr class="hover:bg-purple-200" onClick={onClick}>
      <td class="flex justify-center">
        <div
          class={clsx(
            "rounded-full w-4 h-4",
            expirationDay > today && "!bg-green-500",
            expirationDay < today && "!bg-red-600",
            expirationDay === today && "!bg-yellow-500"
          )}
        ></div>
      </td>
      <td>{id}</td>
      <td>{name}</td>
      <td>{addedDate}</td>
      <td>{expirationDate}</td>
      <td>{note}</td>
    </tr>
  );
}

export default ExpirationRow;
