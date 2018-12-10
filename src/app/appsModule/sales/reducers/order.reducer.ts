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
};

export const OrderReducer: Reducer<any> = (state: OrdersState[], action: Action) => {
  switch (action.type) {
    case NEWORDERS:
      return action.payload.data ? [...action.payload.data] : state;

    case ADDORDER:
      return [...state, action.payload];

    case CHANGEORDER:
      return [
        ...state.map(stateItem => {
          stateItem.order = stateItem.order.id === action.payload.id ? action.payload : stateItem.order;
          return stateItem;
        })
      ];

    case DELETEORDER:
      return [...state.filter(stateItem => stateItem.order.id !== action.payload.id)];

    default:
      return state;
  }
};
