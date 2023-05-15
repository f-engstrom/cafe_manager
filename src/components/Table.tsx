import ExpirationRow from "./ExpirationRow";
import { For, JSXElement, createResource, createSignal, on } from "solid-js";
import AddUpdateDeleteExpirationRow from "./AddExpirationRow";
import Popover from "./Popover";
import Button from "./Button";
import { getFromExpiraton, getProducts } from "../lib/supabase";

interface Props {
  onClick: () => void;
  heading: string;
  buttonText: string;
  tableHeadings: string[];
  rows: JSXElement;
}

export default function Table(props: Props) {
  const { onClick, heading, buttonText, tableHeadings } = props;
  return (
    <>
      <div class="flex justify-between mb-6">
        <h2 class=" text-2xl bold">{heading}</h2>
        <Button variant="primary" onClick={onClick}>
          {buttonText}
        </Button>
      </div>
      <table class="table-auto">
        <tbody>
          <tr>
            <For each={tableHeadings}>
              {(heading) => {
                return <th>{heading}</th>;
              }}
            </For>
          </tr>
          {props.rows}
        </tbody>
      </table>
    </>
  );
}
