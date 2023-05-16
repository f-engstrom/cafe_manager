import { Outlet, useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";
import { session } from "../App";
import Header from "./Header";

export default function RouteGuard() {
  const navigate = useNavigate();

  createEffect(() => {
    if (!session()) {
      navigate("/signin", { replace: true });
    }
  });

  return (
    <>
      <Header />
      <main class="text-center mx-auto text-gray-700 p-6 flex flex-col">
        <Outlet />
      </main>
    </>
  );
}
