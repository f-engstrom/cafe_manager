import { Component } from "solid-js";
import "./index.css";
import { Router, Route, Routes, A } from "@solidjs/router";
import ProductAdminView from "./components/ProductAdminView";
import ProductExpirationView from "./components/ProductExpirationView";

const App: Component = () => {
  return (
    <Router>
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
        </nav>
      </header>
      <main class="text-center mx-auto text-gray-700 p-6 flex flex-col">
        <Routes>
          <Route path="/" component={ProductExpirationView} />
          <Route path="/admin" component={ProductAdminView} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
