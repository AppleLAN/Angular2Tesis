import { Client } from '../../interfaces/client';
import { gridReducer } from './reducers/grid.reducer';

export interface State {
    clients: Client
}
export const reducers = {
    clients: gridReducer
};
