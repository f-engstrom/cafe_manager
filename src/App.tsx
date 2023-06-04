import { Component, Show } from "solid-js";
import "./index.css";
import { Router, Route, Routes, A } from "@solidjs/router";
import ProductAdminView from "./components/ProductAdminView";
import ProductExpirationView from "./components/ProductExpirationView/ProductExpirationView";
import RouteGuard from "./components/RouteGuard";
import SignInView from "./components/SignInView";
import { useAuth } from "./components/AuthContext";
import LoadingSpinner from "./components/LoadingSpinner";

const App: Component = () => {
  const [session] = useAuth();

  return (
    <Show
      when={session() || session() === null}
      fallback={
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center">
          <LoadingSpinner />
        </div>
      }
    >
      <Router>
        <Routes>
          <Route path="signin" component={SignInView} />
          <Route path="/" component={RouteGuard}>
            <Route path="/" component={ProductExpirationView} />
            <Route path="/admin" component={ProductAdminView} />
          </Route>
        </Routes>
      </Router>
    </Show>
  );
};

export default App;
