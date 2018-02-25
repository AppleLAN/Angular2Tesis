export interface Product {
  id: number;
  company_id: number;
  provider_id: number;
  name: string;
  code: string;
  stock: number;
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
export interface AddedBuyStock extends AddedStock {
  provider: String;
}

export interface AddedSaleStock extends AddedStock {
  client: String;
}

export interface SelectedStock {
  [id: string]: { stock: AddedStock[],
                  subTotal: number,
                  typeOfBuy?: string,
                  saleDate?: Date,
                  paymentMethods?: string
                };
}

export interface NewOperation {
  newStock: AddedStock[];
  total: number;
}

export interface NewBuy extends NewOperation{
  typeOfBuy: string;
  provider_id: number;
}

export interface NewSale extends NewOperation {
  paymentMethods: string;
  client_id: number;
  saleDate: Date;
}
