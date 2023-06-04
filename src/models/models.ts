import { Database } from "./supabase";

export interface NewProduct {
  product: number;
  exp_date: string;
  start_date: string;
  note: string;
}
export interface UpdatedProduct {
  product: number;
  exp_date: string;
  start_date: string;
  note: string;
  id: number | string;
}
export interface FormFields {
  id: number;
  startDate: string;
  expirationDate: string;
}

type ProductExpirationRow =
  Database["public"]["Tables"]["product_expiration"]["Row"];
export interface ProductRow extends ProductExpirationRow {}
export type Product = Database["public"]["Tables"]["products"]["Row"];
