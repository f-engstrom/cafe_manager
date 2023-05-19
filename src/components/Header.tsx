import { A, useNavigate } from "@solidjs/router";
import { supabase } from "../lib/supabase";
function Header() {
  const navigate = useNavigate();

  return (
    <header class=" bg-gradient-to-r from-purple-400 to-purple-600  shadow-2xl p-4">
      <h1 class="text-center text-2xl font-bold mb-4">Cafe Manager</h1>
      <nav>
        <ul class="flex gap-2 justify-center">
          <li>
            <A class="underline" href="/">
              Home
            </A>
          </li>
          <li>
            <A class="underline" href="/admin">
              Admin
            </A>
          </li>
        </ul>
        <p>{session()?.user?.email}</p>
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
      </nav>
    </header>
  );
}
export default Header;
