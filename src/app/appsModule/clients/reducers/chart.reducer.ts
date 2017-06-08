import { Action } from './../../../interfaces/action';
import { Reducer } from './../../../interfaces/reducer';

export const NEWCHARTDATA = 'NEWCHARTDATA';

export const chartReducer: Reducer<any> = (state: any[], action: Action) => {
    switch(action.type){
        case NEWCHARTDATA:
            return action.payload;
        default:
            return state;
    }
};