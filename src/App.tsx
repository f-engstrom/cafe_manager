import { Component } from "solid-js";
import { Table } from "./components/Table";
import "./index.css";
import { createClient } from "@supabase/supabase-js";
import { Database } from "./models/supabase";
import { Router, Route, Routes, A } from "@solidjs/router";
import ProductAdmin from "./components/ProductAdmin";

const supabaseUrl = "https://jwajghgfcoyqgvanwhwl.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;
export const supabase = createClient<Database>(
  supabaseUrl,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3YWpnaGdmY295cWd2YW53aHdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM5NjE4NTAsImV4cCI6MTk5OTUzNzg1MH0.7eIle3K4ik5nYm3ZbBGwKJ2XakRWdPpBZdaT4Ia39RU"
);

const App: Component = () => {
  return (
    <Router>
      <header>
        <nav>
          <ul>
            <li>
              <A href="/">Home</A>
            </li>
            <li>
              <A href="/admin">Admin</A>
            </li>
          </ul>
        </nav>
      </header>
      <main class="text-center mx-auto text-gray-700 p-4 flex flex-col">
        <Routes>
          <Route path="/" component={Table} />
          <Route path="/admin" component={ProductAdmin} />
          {/* 👈 Define the home page route */}
        </Routes>
      </main>
    </Router>
  );
};

export default App;
