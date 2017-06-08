import { storeFreeze } from 'ngrx-store-freeze';
import { Client } from '../interfaces/client';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment.prod';
import { compose } from '@ngrx/core/compose';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { userReducer } from './shared/reducers/user.reducer';

export interface State {
    user: User,
}
const reducers = {
    user: userReducer,
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