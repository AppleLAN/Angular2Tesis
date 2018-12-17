import { Action } from './../../../interfaces/action';
import { Reducer } from './../../../interfaces/reducer';

export const NEWCLIENTCHARTDATA = 'NEWCLIENTCHARTDATA';
export const NEWPROVIDERCHARTDATA = 'NEWPROVIDERCHARTDATA';
export const NEWSTOCKCHARTDATA = 'NEWSTOCKCHARTDATA';

export interface ChartsState {
  stock: any;
  providers: any;
  clients: any;
}

export const initialObject: ChartsState = {
  stock: null,
  providers: null,
  clients: null
};

export const chartsReducer: Reducer<any> = (state: ChartsState, action: Action) => {
  if (!state) {
    state = initialObject;
  }
  switch (action.type) {
    case NEWCLIENTCHARTDATA:
      state.clients = action.payload;
      return { ...state };
    case NEWPROVIDERCHARTDATA:
      state.providers = action.payload;
      return { ...state };
    case NEWSTOCKCHARTDATA:
      state.stock = action.payload;
      return { ...state };
    default:
      return state;
  }
};
