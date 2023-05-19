import { A, useNavigate } from "@solidjs/router";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

function SideBar() {
  const navigate = useNavigate();
  const [session] = useAuth();
  return (
    <div class="min-h-screen flex fixed col-span-2">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-b from-purple-400 to-purple-600 px-6">
        <div class="flex h-16 shrink-0 items-center">
          {/* <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white" alt="Your Company"> */}
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li>
                  {/* <!-- Current: "bg-purple-700 text-white", Default: "text-purple-200 hover:text-white hover:bg-purple-700" --> */}
                  <A
                    href="/"
                    end={true}
                    activeClass="bg-purple-700"
                    class="text-purple-200 hover:text-white hover:bg-purple-700 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  >
                    <svg
                      class="h-6 w-6 shrink-0 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                    Framtaget
                  </A>
                </li>
                <li>
                  <A
                    href="/admin"
                    end={true}
                    activeClass="bg-purple-700"
                    class="text-purple-200 hover:text-white hover:bg-purple-700 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                  >
                    <svg
                      class="h-6 w-6 shrink-0 text-purple-200 group-hover:text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                      />
                    </svg>
                    Produkter
                  </A>
                </li>
              </ul>
            </li>
            ,
            <li class="-mx-6 mt-auto">
              <a
                href="#"
                class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-purple-700"
              >
                <img
                  class="h-8 w-8 rounded-full bg-purple-700"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span class="sr-only">Your profile</span>
                <span aria-hidden="true">{session()?.user?.email}</span>
              </a>
            </li>
            <li class="-mx-6">
              <button
                class=""
                name="signOut"
                onClick={() => {
                  supabase.auth.signOut();
                  navigate("/signin", { replace: true });
                }}
              >
                logga ut
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default SideBar;
