export interface Stock {
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
}
