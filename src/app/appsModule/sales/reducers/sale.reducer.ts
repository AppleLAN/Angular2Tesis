import { Product } from '../../../interfaces/stock';
import { Sale, Details } from '../../../interfaces/sale';
import { Action } from './../../../interfaces/action';
import { Reducer } from './../../../interfaces/reducer';

export const NEWSALES = 'NEWSALES';
export const CHANGESALES = 'CHANGESALES';
export const DELETESALES = 'DELETESALES';
export const ADDSALES = 'ADDSALES';

export interface SaleState {
  sale: Sale;
  sale_details: Details[];
  products: Product[];
}

export const initialObject: SaleState = {
  sale: null,
  sale_details: null,
  products: null
};

export const SaleReducer: Reducer<any> = (state: SaleState[], action: Action) => {
  switch (action.type) {
    case NEWSALES:
      return action.payload.data ? [...action.payload.data] : state;

    case ADDSALES:
      return [...state, action.payload];

    case CHANGESALES:
      return [
        ...state.map(stateItem => {
          stateItem.sale = stateItem.sale.id === action.payload.id ? action.payload : stateItem.sale;
          return stateItem;
        })
      ];

    case DELETESALES:
      return [...state.filter(stateItem => stateItem.sale.id !== action.payload.id)];

    default:
      return state;
  }
};
