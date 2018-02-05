import { Client } from '../../interfaces/client';
import { gridReducer } from './reducers/grid.reducer';
import { chartReducer } from './reducers/chart.reducer';

export interface State {
    chart: any,
    clients: Client
}
export const reducers = {
    chart: chartReducer,
    clients: gridReducer
};
