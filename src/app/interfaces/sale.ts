export interface Sale {
  id: number;
  saleTotal: number;
  client: string;
  status: string;
}

export interface Details {
  id: number;
  sale_id: number;
  price: number;
  product_id: number;
  product_name: string;
  quantity: number;
  tax: number;
}