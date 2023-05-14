import clsx from "clsx";
import { JSX, createSignal } from "solid-js";

interface Props {
  children: JSX.Element;
  heading: string;
  onClose: () => void;
  open: boolean;
}

function Popover(props: Props) {
  const { heading, onClose } = props;
  console.log(open, open);

  return (
    <div class={clsx(!props.open && "hidden")}>
      <div
        class="fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div class="px-4 lg:px-6 bottom-0 left-0 right-0 md:left-auto h-5/6 max-h-[80%] md:top-0 md:h-full md:max-h-full md:max-h-full md:w-[27rem] fixed bg-white shadow-topBottom z-[999] flex flex-col">
        <div class="lg:px-6 -mx-4 my-0 flex min-h-[3.5rem] items-center border-b px-4 md:min-h-[4rem] lg:-mx-6">
          <h2 class="font-standard text-lg font-bold text-greyDarker break-words">
            {heading}
          </h2>
          <button
            class="-mr-4 ml-auto inline-flex items-center rounded-full hover:bg-greyLighter"
            type="button"
            onClick={onClose}
          >
            <span class="relative inline-block p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="prefix__icon-close"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                class="align-top fill-current transform inline-block w-6 h-6 rotate-0"
                aria-hidden="true"
              >
                <path
                  id="prefix__Path_26"
                  d="M0 0h24v24H0z"
                  data-name="Path 26"
                  style="fill:none"
                ></path>
                <path
                  id="prefix__Path_27"
                  d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7A1 1 0 005.7 7.11L10.59 12 5.7 16.89a1 1 0 001.41 1.41L12 13.41l4.89 4.89a1 1 0 001.41-1.41L13.41 12l4.89-4.89a1 1 0 000-1.4z"
                  data-name="Path 27"
                ></path>
              </svg>
            </span>
          </button>
        </div>
        {props.children}
      </div>
    </div>
  );
}
export default Popover;
