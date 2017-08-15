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
const reducers = {
    chart: chartReducer,
    providers: gridReducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  }else {
    return developmentReducer(state, action);
  }
}
