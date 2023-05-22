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
      <main class="bg-white">
        {" "}
        <SideBar />
        <div class="ml-36 flex flex-col">
          <Outlet />
        </div>
      </main>
    </>
  );
}
