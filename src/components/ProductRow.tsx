interface Props {
  name: string;
  expirationDays: number;
  onClick: () => void;
}

function ProductRow({ name, expirationDays, onClick }: Props) {
  return (
    <tr onClick={onClick}>
      <td>{name}</td>
      <td>{expirationDays}</td>
    </tr>
  );
}
export default ProductRow;
