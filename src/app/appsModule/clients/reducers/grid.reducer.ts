import { Action } from './../../../interfaces/action';
import { Reducer } from './../../../interfaces/reducer';
import { Client } from './../../../interfaces/client';

export const NEWCLIENTS = 'NEWCLIENTS';
export const CHANGECLIENT = 'CHANGECLIENT';

export const initialModalObject: Client = {
    name: '',
    fantasyName: '',
    email: '',
    place: '',
    adress: '',
    telephone: 0,
    cuit: '',
    web: '',
}

export const gridReducer: Reducer<any> = (state: Client[], action: Action) => {
    switch(action.type){
        case 'NEWCLIENTS':
            state = action.payload;
            return state;
        case 'CHANGECLIENT':
            const index = state.findIndex(
                function (element) {
                    return element.email === action.payload.email && element.cuit === action.payload.cuit;
                }
            );
            state[index] = action.payload;
            return state;
        default:
            return state;
    }
};