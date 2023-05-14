interface Props {
  name: string;
  expirationDays: number;
}

function ProductRow({ name, expirationDays }: Props) {
  return (
    <>
      <td>{name}</td>
      <td>{expirationDays}</td>
    </>
  );
}
export default ProductRow;
