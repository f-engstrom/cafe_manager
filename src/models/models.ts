export interface Product {
  id: number;
  name: string;
  addedDate: number;
  expirationDate: number;
  note: string;
}
export interface NewProduct {
  product: number;
  exp_date: string;
  start_date: string;
  note: string;
}
export interface FormFields {
  id: number;
  addedDate: string;
  expirationDate: string;
}
