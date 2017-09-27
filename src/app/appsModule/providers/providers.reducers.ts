import { storeFreeze } from 'ngrx-store-freeze';
import { Provider } from '../../interfaces/provider';
import { environment } from '../../../environments/environment.prod';
import { compose } from '@ngrx/core/compose';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { gridReducer } from './reducers/grid.reducer';
import { chartReducer } from './reducers/chart.reducer';

export interface State {
    chart: any,
    providers: Provider
}
export const reducers = {
    chart: chartReducer,
    providers: gridReducer
};
