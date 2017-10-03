import { Provider } from './provider';
export interface Product {
  id: number;
  company_id: number;
  name: string;
  code: string;
  description: string;
  cost_price: number;
  sale_price: number;
  category_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  type?: string;
  quantity?: number;
}

export interface Stock {
  id: number;
  product_id: number;
  company_id: number;
  order_id: number;
  sale_id: number;
  quantity: number;
  type: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface AddedStock {
  product: Product;
  quantity: number;
}

export interface NewBuy {
  newStock: AddedStock[],
  total: number,
  invoiceType: string;
  typeOfBuy: string;
  provider: number;  
}