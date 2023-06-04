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
    <div class="ml-5 mt-8 flex max-h-screen flex-col overflow-hidden bg-white">
      <div class="mx-10 mb-6 flex  justify-between bg-white">
        <h2 class=" bold text-2xl">{heading}</h2>
        <Button variant="primary" displayWidth="auto" onClick={onClick}>
          {buttonText}
        </Button>
      </div>
      <Show
        when={!props.loading}
        fallback={<LoadingSpinner className="mt-8" />}
      >
        <div class="mb-10 max-h-fit overflow-auto">
          <table class="w-full border-collapse">
            <thead class="sticky top-0">
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
        </div>
      </Show>
    </div>
  );
}
