import { useNavigate } from "@solidjs/router";
import { supabase } from "../lib/supabase";
import { setSession } from "../App";

function SignInView() {
  const navigate = useNavigate();

  const signIn = async (event: Event) => {
    event.preventDefault();
    const {
      data: { session },
    } = await supabase.auth.signInWithPassword({
      email: event.target.email.value,
      password: event.target.password.value,
    });
    setSession(session);

    navigate("/", { replace: true });
  };
  return (
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
      <form class="flex flex-col gap-4" onSubmit={signIn}>
        <input type="text" placeholder="email" name="email" />
        <input type="password" placeholder="lösenord" name="password" />
        <button type="submit">logga in</button>
      </form>
    </div>
  );
}
export default SignInView;
