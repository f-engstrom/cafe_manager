import { createClient } from "@supabase/supabase-js";
import { Database } from "../models/supabase";
import { NewProduct } from "../models/models";

const supabaseUrl = "https://jwajghgfcoyqgvanwhwl.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;
export const supabase = createClient<Database>(
  supabaseUrl,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3YWpnaGdmY295cWd2YW53aHdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM5NjE4NTAsImV4cCI6MTk5OTUzNzg1MH0.7eIle3K4ik5nYm3ZbBGwKJ2XakRWdPpBZdaT4Ia39RU"
);
export const getFromExpiraton = async () => {
  const { data, error } = await supabase.from("product_expiration")
    .select(`*, products (
      product_name
    )`);
  if (error) console.log("error", error);
  return data;
};
export const deleteFromExpiraton = async (id: number) => {
  const { data, error } = await supabase
    .from("product_expiration")
    .delete()
    .eq("id", id);
  if (error) console.log("error", error);
};
export const updateExpiration = async (id: number, exp_date: string) => {
  const { data, error } = await supabase
    .from("product_expiration")
    .update({ exp_date })
    .eq("id", id);
  if (error) console.log("error", error);
};
export const addToExpiration = async ({
  product,
  exp_date,
  start_date,
  note,
}: NewProduct) => {
  console.log(product);
  const { data, error } = await supabase
    .from("product_expiration")
    .insert({ product, exp_date, start_date, note });
  if (error) console.log("error", error);
};
const addProduct = async (e: any) => {
  e.preventDefault();
  const { data, error } = await supabase.from("products").insert({
    product_name: e.target.product_name.value,
    expiration_days: e.target.expiration_days.value,
  });
  if (error) console.log("error", error);
};
export const getProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) console.log("error", error);
  return data;
};
const deleteFromProducts = async (id: number) => {
  const { data, error } = await supabase.from("products").delete().eq("id", id);
  if (error) console.log("error", error);
};
