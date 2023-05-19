import clsx from "clsx";

interface Props {
  message: string;
  type: "error" | "success";
  heading?: string;
  className?: string;
}
function Alert(props: Props) {
  const { message, type, heading, className } = props;
  return (
    <div
      class={clsx(
        "rounded-md p-4",
        type === "error" ? "bg-red-50" : "bg-green-50",
        className
      )}
    >
      <div class="flex">
        <div class="flex-shrink-0">
          {type === "error" ? (
            <svg
              class="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clip-rule="evenodd"
              />
            </svg>
          ) : (
            <svg
              class="h-5 w-5 text-green-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clip-rule="evenodd"
              />
            </svg>
          )}
        </div>
        <div class="ml-3">
          <h3
            class={clsx(
              "text-sm font-medium text-left",
              type === "error" ? " text-red-800" : "text-green-800"
            )}
          >
            {heading}
          </h3>
          <div
            class={clsx(
              "mt-2 text-sm",
              type === "error" ? " text-red-700" : "text-green-700"
            )}
          >
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Alert;
