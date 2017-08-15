import { Action } from './../../../interfaces/action';
import { Reducer } from './../../../interfaces/reducer';

export const NEWCLIENTCHARTDATA = 'NEWCLIENTCHARTDATA';

export const chartReducer: Reducer<any> = (state: any[], action: Action) => {
    switch (action.type) {
        case NEWCLIENTCHARTDATA:
            return action.payload;
        default:
            return state;
    }
};
