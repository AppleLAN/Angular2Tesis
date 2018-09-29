import { Provider } from '../../interfaces/provider';
import { gridReducer } from './reducers/grid.reducer';

export interface State {
    providers: Provider
}
export const reducers = {
    providers: gridReducer
};
