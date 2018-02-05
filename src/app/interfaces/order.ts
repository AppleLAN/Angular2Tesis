export interface Order {
  id: number;
  orderTotal: number;
  provider: string;
  status: string;
}

export interface Details {
  id: number;
  order_id: number;
  price: number;
  product_id: number;
  product_name: string;
  quantity: number;
  tax: number;
}