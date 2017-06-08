import { storeFreeze } from 'ngrx-store-freeze';
import { Client } from '../../interfaces/client';
import { environment } from '../../../environments/environment.prod';
import { compose } from '@ngrx/core/compose';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { gridReducer } from './reducers/grid.reducer';
import { chartReducer } from './reducers/chart.reducer';

export interface State {
    chart: any,
    grid: Client
}
const reducers = {
    chart: chartReducer,
    grid: gridReducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze,combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  }
  else {
    return developmentReducer(state, action);
  }
}