import { compose } from '@ngrx/core/compose';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment.prod';
import { User } from '../interfaces/user';
import { reducers as clientReducer } from './clients/clients.reducers';
import { reducers as providersReducer } from './providers/providers.reducers';
import { reducers as OrderReducer } from './sales/sales.reducers';
import { chartsReducer } from './shared/charts/charts.reducer';
import { userReducer } from './shared/reducers/user.reducer';
import { reducers as stockReducer } from './stock/stock.reducers';

export interface State {
  user: User;
}
const reducers = {
  user: userReducer,
  chart: chartsReducer,
  ...providersReducer,
  ...clientReducer,
  ...stockReducer,
  ...OrderReducer
};

const developmentReducer: ActionReducer<State> = compose(
  storeFreeze,
  combineReducers
)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}
