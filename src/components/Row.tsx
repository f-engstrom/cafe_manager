import { JSX, createSignal } from "solid-js";
import Button from "./Button";

interface Props {
  children: JSX.Element;
  inputs?: JSX.Element;
  onUpdate: () => void;
  onDelete: () => void;
}

function Row({ children, onUpdate, onDelete }: Props) {
  const [showButtons, setShowButtons] = createSignal(false);

  return (
    <tr
      class="hover:bg-stone-100"
      onClick={() => setShowButtons(!showButtons())}
    >
      {children}
      {showButtons() && (
        <div>
          <Button variant="primary" onClick={onUpdate} class="mr-2">
            Uppdatera
          </Button>
          <Button variant="danger" onClick={onDelete}>
            Ta bort
          </Button>
        </div>
      )}
    </tr>
  );
}
export default Row;
