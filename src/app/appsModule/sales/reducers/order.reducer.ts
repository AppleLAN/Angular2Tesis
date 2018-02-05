import { Product } from '../../../interfaces/stock';
import { Order, Details } from '../../../interfaces/order';
import { Action } from './../../../interfaces/action';
import { Reducer } from './../../../interfaces/reducer';

export const NEWORDERS = 'NEWORDERS';
export const ADDORDER = 'ADDORDER';
export const CHANGEORDER = 'CHANGEORDER';
export const DELETEORDER = 'DELETEORDER';

export interface OrdersState {
  order: Order;
  details: Details[];
  products: Product[];
}

export const initialObject: OrdersState = {
    order: null,
    details: null,
    products: null
}

export const OrderReducer: Reducer<any> = (state: OrdersState[], action: Action) => {
    switch (action.type) {
        case NEWORDERS:
            return action.payload.data;
        case ADDORDER:
            return [...state, action.payload];
        case CHANGEORDER:
            return state.map(item =>  { 
                item.order = item.order.id === action.payload.id ? action.payload : item.order;
                return item;
            });
        case DELETEORDER:
            return state.filter(item => {
                return item.order.id !== action.payload.id;
            })
        default:
            return state;
    }
};