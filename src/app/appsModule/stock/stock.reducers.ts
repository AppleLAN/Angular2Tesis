import { Stock } from '../../interfaces/stock';
import { gridReducer } from './reducers/grid.reducer';
import { chartReducer } from './reducers/chart.reducer';

export interface State {
    chart: any,
    stocks: Stock
}
export const reducers = {
    chart: chartReducer,
    stock: gridReducer
};
