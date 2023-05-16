import { Component, createEffect, createSignal } from "solid-js";
import "./index.css";
import { Router, Route, Routes, A } from "@solidjs/router";
import ProductAdminView from "./components/ProductAdminView";
import ProductExpirationView from "./components/ProductExpirationView";
import { supabase } from "./lib/supabase";
import RouteGuard from "./components/RouteGuard";
import SignInView from "./components/SignInView";

export const [session, setSession] = createSignal<any>(null);
const App: Component = () => {
  createEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  });

  return (
    <Router>
      <Routes>
        <Route path="signin" component={SignInView} />
        <Route path="/" component={RouteGuard}>
          <Route path="/" component={ProductExpirationView} />
          <Route path="/admin" component={ProductAdminView} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
