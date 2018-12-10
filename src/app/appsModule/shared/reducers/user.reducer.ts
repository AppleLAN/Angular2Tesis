import { Action } from './../../../interfaces/action';
import { Reducer } from './../../../interfaces/reducer';
import { User } from './../../../interfaces/user';
import { CompleteUser } from './../../../interfaces/complete.user';
import { initialModalObject } from '../../clients/reducers/grid.reducer';

export const NEWUSER = 'NEWUSER';
export const NEWCOMPANY = 'NEWCOMPANY';
export const NEWUSERPROFILE = 'NEWUSERPROFILE';

export const initialUserObject: User = {
  company_id: '',
  isAdmin: false,
  name: '',
  lastName: '',
  address: '',
  email: '',
  password: '',
  confirm: '',
  sales: false,
  stock: false,
  clients: false,
  providers: false
};

const emptyState: CompleteUser = {
  profile: initialUserObject,
  company: initialModalObject
};

export const userReducer: Reducer<any> = (state: CompleteUser, action: Action) => {
  switch (action.type) {
    case NEWUSER:
      emptyState.profile = action.payload.profile;
      if (action.payload.company) {
        emptyState.company = action.payload.company;
      }
      return emptyState;
    case NEWUSERPROFILE:
      emptyState.profile = action.payload;
      return emptyState;
    case NEWCOMPANY:
      emptyState.company = action.payload;
      return emptyState;
    default:
      return state;
  }
};
