import { Provider } from './../interfaces/provider';
import { storeFreeze } from 'ngrx-store-freeze';
import { Client } from '../interfaces/client';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment.prod';
import { compose } from '@ngrx/core/compose';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { userReducer } from './shared/reducers/user.reducer';
import { reducers as clientReducer } from './clients/clients.reducers';
import { reducers as providersReducer } from './providers/providers.reducers';
import { reducers as stockReducer } from './stock/stock.reducers';

export interface State {
    user: User
}
const reducers = {
    user: userReducer,
    ...providersReducer,
    ...stockReducer
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}
