import { Outlet, useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";
import SideBar from "./SideBar";
import { useAuth } from "./AuthContext";

export default function RouteGuard() {
  const navigate = useNavigate();
  const [session] = useAuth();

  createEffect(() => {
    if (!session()) {
      navigate("/signin", { replace: true });
    }
  });

  return (
    <>
      <main class="grid grid-cols-12 bg-white">
        {" "}
        <SideBar />
        <div class=" flex grow flex-col p-6 col-span-10 col-start-3">
          <Outlet />
        </div>
      </main>
    </>
  );
}
