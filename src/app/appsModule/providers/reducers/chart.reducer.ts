import { Action } from './../../../interfaces/action';
import { Reducer } from './../../../interfaces/reducer';

export const NEWPROVIDERCHARTDATA = 'NEWPROVIDERCHARTDATA';

export const chartReducer: Reducer<any> = (state: any[], action: Action) => {
    switch (action.type) {
        case NEWPROVIDERCHARTDATA:
            return action.payload;
        default:
            return state;
    }
};
