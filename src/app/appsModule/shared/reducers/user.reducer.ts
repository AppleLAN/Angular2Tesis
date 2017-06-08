import { Action } from './../../../interfaces/action';
import { Reducer } from './../../../interfaces/reducer';
import { User } from './../../../interfaces/user';
import { CompleteUser } from './../../../interfaces/complete.user';
import { initialModalObject } from '../../clients/reducers/grid.reducer';

export const NEWUSER = 'NEWUSER';
export const NEWCOMPANY = 'NEWCOMPANY';

export const initialUserObject: User = {
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
}

const emptyState = {
    profile: null,
    company:null
}

const initialCompanyObject = initialModalObject;

export const userReducer: Reducer<any> = (state: CompleteUser, action: Action) => {
    switch(action.type){
        case NEWUSER:
            emptyState.profile = action.payload;
            return emptyState;
        case NEWCOMPANY:
            emptyState.company = action.payload;
            return emptyState;
        default:
            return state;
    }
};