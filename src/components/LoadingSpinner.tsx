import clsx from "clsx";
import { className } from "solid-js/web";

interface Props {
  className?: string;
}

function LoadingSpinner({ className }: Props) {
  // return a tailwind loading spinner
  return (
    <div class={clsx("flex justify-center items-center", className)}>
      <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );
}
export default LoadingSpinner;
