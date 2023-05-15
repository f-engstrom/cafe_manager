import clsx from "clsx";
import { JSX } from "solid-js";

interface Props {
  children: JSX.Element;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  class?: string;
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
}

function Button(props: Props) {
  const {
    type = "button",
    onClick,
    disabled,
    class: className,
    variant = "primary",
  } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      class={clsx(
        "px-4 py-2 rounded-md text-white",
        variant === "primary" && "bg-purple-500 hover:bg-purple-600",
        variant === "secondary" && "bg-gray-500 hover:bg-gray-600",
        variant === "danger" && "bg-red-500 hover:bg-red-600",
        className
      )}
    >
      {props.loading ? (
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        props.children
      )}
    </button>
  );
}
export default Button;
