import { createStore } from "solid-js/store";
import { Row } from "./Row";
import { For } from "solid-js";

export interface Product {
  id: number;
  name: string;
  addedDate: number;
  expirationDate: number;
}
interface FormFields {
  id: number;
  addedDate: string;
  expirationDate: string;
}
// date now plus x days  to localstring
// const date = new Date();
// date.setDate(date.getDate() + 7);
// console.log(date.toLocaleString());

const createRow = (productName: number) => {
  const date = new Date();
  switch (productName) {
    case 1:
      console.log("hej");
      return {
        id: 1,
        name: "Chokladboll",
        addedDate: Date.now(),
        expirationDate: date.setDate(date.getDate() + 7),
      };
    case 2:
      return {
        id: 2,
        name: "Kaka",
        addedDate: Date.now(),
        expirationDate: date.setDate(date.getDate() + 10),
      };
  }
};
const setFutureDate = (date: string, days: number) => {
  if (date === "") return "2018-07-19";
  console.log(new Date(Date.parse(date)).toISOString().split("T")[0]);
  const dateObj = new Date(Date.parse(date));
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj.toISOString().split("T")[0];
};

export function Table() {
  const [form, setForm] = createStore<FormFields>({
    id: 0,
    addedDate: "",
    expirationDate: "",
  });
  const updateFormField = (fieldName: string) => (event: Event) => {
    const inputElement = event.currentTarget as HTMLInputElement;
    console.log(fieldName, inputElement.value);
    if (fieldName === "id") {
      setForm({
        [fieldName]: parseInt(inputElement.value),
      });
      return;
    }

    setForm({
      [fieldName]: inputElement.value,
    });
  };

  const date1 = new Date();
  const date2 = new Date();
  const date3 = new Date();
  const date4 = new Date();
  const date5 = new Date();
  const addedDate1 = date1.setDate(date1.getDate() - 14);
  const addedDate2 = date1.setDate(date2.getDate() - 7);
  const addedDate3 = date1.setDate(date3.getDate() - 7);
  const addedDate4 = date1.setDate(date4.getDate() + 2);
  const [rows, setRows] = createStore<Product[]>([
    {
      id: 1,
      name: "Chokladboll",
      addedDate: addedDate1,
      expirationDate: addedDate2,
    },
    {
      id: 2,
      name: "Kaka",
      addedDate: addedDate3,
      expirationDate: addedDate4,
    },
    {
      id: 3,
      name: "Kaka",
      addedDate: date5.setDate(date5.getDate() - 5),
      expirationDate: Date.now(),
    },
  ]);

  return (
    <>
      <form
        class="pb-4"
        onSubmit={(event: Event) => {
          event.preventDefault();
          console.log(
            event.currentTarget.elements,
            event.target.addedDate.value,
            event.target.expirationDate.value
          );

          console.log(form, createRow(form.id));
          //   setRows([...rows, createRow(form.id)]);
        }}
      >
        <select
          class="mr-2"
          name="product"
          id="product"
          onChange={updateFormField("id")}
        >
          <option value="">Välj Produkt</option>
          <option value="1">Cholkladboll</option>
          <option value="2">Kaka</option>
        </select>
        <input
          type="date"
          id="start"
          name="addedDate"
          onChange={updateFormField("addedDate")}
        />
        <input
          type="date"
          id="end"
          name="expirationDate"
          //   disabled
          value={setFutureDate(form.addedDate, 7)}
          onChange={updateFormField("expirationDate")}
        />
        <button class=" bg-green-200" type="submit">
          <span class="p-2"> Lägg till rad</span>{" "}
        </button>
      </form>
      <table class="table-auto">
        <tbody>
          <tr>
            <th>Id</th>
            <th>Produkt</th>
            <th>Uttagen</th>
            <th>Utgångsdatum</th>
          </tr>
          <For each={rows}>
            {(row) => (
              <Row
                id={row.id}
                expirationDate={row.expirationDate}
                addedDate={row.addedDate}
                name={row.name}
              />
            )}
          </For>
        </tbody>
      </table>
    </>
  );
}
