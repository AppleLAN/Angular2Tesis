import { Stock } from '../../interfaces/stock';
import { gridReducer } from './reducers/grid.reducer';

export interface State {
    stocks: Stock
}
export const reducers = {
    stock: gridReducer
};
