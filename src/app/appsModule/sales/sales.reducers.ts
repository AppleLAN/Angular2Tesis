import { OrderReducer, OrdersState } from './reducers/order.reducer';
import { SaleReducer, SaleState } from './reducers/sale.reducer';
export interface State {
  orders: OrdersState;
  sales: SaleState;
}
export const reducers = {
  orders: OrderReducer,
  sales: SaleReducer
};
