import { Action } from './../../../interfaces/action';
import { Reducer } from './../../../interfaces/reducer';
import { Client } from './../../../interfaces/client';

export const NEWCLIENTS = 'NEWCLIENTS';
export const CHANGECLIENT = 'CHANGECLIENT';
export const ADDCLIENT = 'ADDCLIENT';
export const DELETECLIENT = 'DELETECLIENT';

export const chartReducer: Reducer<any> = (state: any[], action: Action) => {
    let index :number = null;
    switch(action.type){
        case 'NEWCLIENTS':
            state = action.payload;
            return state;
        case 'ADDCLIENT':
            return [...state, action.payload];
        case 'CHANGECLIENT':
            index = state.findIndex(
                function (element) {
                    return element.id === action.payload.id;
                }
            );
            state[index] = action.payload;
            return state;
        case 'DELETECLIENT':
            state.filter(item => {
                return item.id !== action.payload.id;
            })
            return state;
        default:
            return state;
    }
};