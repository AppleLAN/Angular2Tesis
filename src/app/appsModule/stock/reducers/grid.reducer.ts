import { Action } from './../../../interfaces/action';
import { Reducer } from './../../../interfaces/reducer';
import { Stock } from './../../../interfaces/stock';

export const NEWSTOCK = 'NEWSTOCK';
export const CHANGESTOCK = 'CHANGESTOCK';
export const ADDSTOCK = 'ADDSTOCK';
export const DELETESTOCK = 'DELETESTOCK';

export const initialModalObject: Stock = {
  id: null,
  company_id: null,
  name: null,
  code: null,
  description: null,
  cost_price: null,
  sale_price: null,
  category_id: null,
  created_at: null,
  updated_at: null,
  deleted_at: null,
}

export const gridReducer: Reducer<any> = (state: Stock[], action: Action) => {
    switch (action.type) {
        case 'NEWSTOCK':
            return action.payload;
        case 'ADDSTOCK':
            return [...state, action.payload];
        case 'CHANGESTOCK':
            return state.map(item => {
                return item.id === action.payload.id ? action.payload : item;
            });
        case 'DELETESTOCK':
            return state.filter(item => {
                return item.id !== action.payload.id;
            })
        default:
            return state;
    }
}
