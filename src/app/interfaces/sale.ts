export interface Sale {
  id: number;
  company_id: number;
  client_id: number;
  user_id: number;
  type: string;
  letter: string;
  client_name: string;
  client_cuit: number;
  client_address: string;
  pos: number;
  number: number;
  discount: number;
  subtotal: number;
  total: number;
  perceptions: number;
  taxes: string;
  warehouse_id: string;
  date: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  payments: string;
  notes: string;
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
