import {
  JSXElement,
  createContext,
  createEffect,
  createSignal,
  useContext,
} from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { supabase } from "../lib/supabase";

export const AuthContext = createContext([{ session: undefined }, {}]);

interface Props {
  session?: [
    get: { session: undefined },
    set: SetStoreFunction<{ session: undefined }>
  ];
  children: JSXElement;
}

export function AuthProvider(props: Props) {
  const [session, setSession] = createSignal(undefined);
  createEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  });

  return (
    <AuthContext.Provider value={[session, setSession]}>
      {props.children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
