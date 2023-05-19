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
    <div class="mt-8 flex flex-col mx-10 bg-white max-h-screen">
      <div class="flex justify-between mb-6  bg-white">
        <h2 class=" text-2xl bold">{heading}</h2>
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
            <tr class="sticky z-10 top-15 bg-white">
              <For each={tableHeadings}>
                {(heading) => {
                  return (
                    <th class="py-3.5 pl-4 pr-3  text-sm font-semibold text-gray-900 sm:pl-3">
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
