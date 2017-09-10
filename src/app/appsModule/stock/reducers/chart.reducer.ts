import { Action } from './../../../interfaces/action';
import { Reducer } from './../../../interfaces/reducer';

export const NEWSTOCKCHARTDATA = 'NEWPROVIDERCHARTDATA';

export const chartReducer: Reducer<any> = (state: any[], action: Action) => {
    switch (action.type) {
        case NEWSTOCKCHARTDATA:
            return action.payload;
        default:
            return state;
    }
};
