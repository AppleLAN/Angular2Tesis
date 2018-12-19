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

export const userReducer: Reducer<any> = (state: CompleteUser, action: Action) => {
  switch (action.type) {
    case NEWUSER:
      return {
        ...state,
        profile: action.payload.profile,
        ...(action.payload.company ? { company: action.payload.company } : initialModalObject)
      };
    case NEWUSERPROFILE:
      return {
        ...state,
        profile: action.payload
      };
    case NEWCOMPANY:
      return {
        ...state,
        company: action.payload
      };
    default:
      return state;
  }
};
