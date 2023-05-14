import clsx from "clsx";
import { JSX } from "solid-js";

interface Props {
  children: JSX.Element;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  class?: string;
  variant?: "primary" | "secondary" | "danger";
}

function Button({
  children,
  type = "button",
  onClick,
  disabled,
  class: className,
  variant = "primary",
}: Props) {
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
      {children}
    </button>
  );
}
export default Button;
