import { For, JSXElement, Show } from "solid-js";
import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  onClick: () => void;
  heading: string;
  buttonText: string;
  tableHeadings: string[];
  rows: JSXElement;
  loading?: boolean;
}

export default function Table(props: Props) {
  const { onClick, heading, buttonText, tableHeadings } = props;
  return (
    <div class="mx-10 mt-8 flex max-h-screen flex-col bg-white">
      <div class="mb-6 flex justify-between  bg-white">
        <h2 class=" bold text-2xl">{heading}</h2>
        <Button variant="primary" displayWidth="auto" onClick={onClick}>
          {buttonText}
        </Button>
      </div>
      <Show
        when={!props.loading}
        fallback={<LoadingSpinner className="mt-8" />}
      >
        <table class="table-auto ">
          <thead>
            <tr class="bg-white">
              <For each={tableHeadings}>
                {(heading) => {
                  return (
                    <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                      {heading}
                    </th>
                  );
                }}
              </For>
            </tr>
          </thead>
          <tbody class="overflow-auto">{props.rows}</tbody>
        </table>
      </Show>
    </div>
  );
}
