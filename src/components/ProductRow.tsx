interface Props {
  name: string;
  expirationDays: number;
  onClick: () => void;
}

function ProductRow({ name, expirationDays, onClick }: Props) {
  return (
    <tr onClick={onClick} class="hover:bg-purple-200 border-t border-gray-300">
      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
        {name}
      </td>
      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
        {expirationDays}
      </td>
    </tr>
  );
}
export default ProductRow;
