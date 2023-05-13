import type { Component } from "solid-js";
import { Table } from "./components/Table";
import "./index.css";

const App: Component = () => {
  return (
    <main class="text-center mx-auto text-gray-700 p-4 flex flex-col">
      <Table />
    </main>
  );
};

export default App;
