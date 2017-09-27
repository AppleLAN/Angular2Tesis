import { storeFreeze } from 'ngrx-store-freeze';
import { Stock } from '../../interfaces/stock';
import { environment } from '../../../environments/environment.prod';
import { compose } from '@ngrx/core/compose';
import { ActionReducer, combineReducers } from '@ngrx/store';
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
