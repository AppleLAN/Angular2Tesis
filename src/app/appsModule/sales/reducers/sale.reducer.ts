import { Product } from '../../../interfaces/stock';
import { Sale, Details } from '../../../interfaces/sale';
import { Action } from './../../../interfaces/action';
import { Reducer } from './../../../interfaces/reducer';

export const NEWSALES = 'NEWSALES';

export interface SaleState {
  sale: Sale[];
  sale_details: Details[];
  products: Product[];
}

export const initialObject: SaleState = {
  sale: null,
  sale_details: null,
  products: null
}

export const SaleReducer: Reducer<any> = (state: SaleState[], action: Action) => {
    switch (action.type) {
        case NEWSALES:
            return action.payload.data;
        default:
            return state;
    }
};