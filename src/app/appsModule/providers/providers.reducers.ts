import { Provider } from '../../interfaces/provider';
import { gridReducer } from './reducers/grid.reducer';
import { chartReducer } from './reducers/chart.reducer';

export interface State {
    chart: any,
    providers: Provider
}
export const reducers = {
    chart: chartReducer,
    providers: gridReducer
};
