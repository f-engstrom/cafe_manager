import clsx from "clsx";

interface Props {
  id: number;
  name: string;
  expirationDate: string;
  addedDate: string;
  note: string;
  onDelete: () => void;
}

export function Row({
  id,
  name,
  expirationDate,
  addedDate,
  note,
  onDelete,
}: Props) {
  const today = new Date().setHours(0, 0, 0, 0);
  const expirationDay = new Date(expirationDate).setHours(0, 0, 0, 0);
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
      <td>{addedDate}</td>
      <td>{expirationDate}</td>
      <td>{note}</td>
      <td>
        <button onClick={onDelete}>ta bort</button>
      </td>
    </tr>
  );
}
