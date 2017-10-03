import { Action } from './../../../interfaces/action';
import { Reducer } from './../../../interfaces/reducer';
import { Stock, Product } from './../../../interfaces/stock';

export const NEWSTOCK = 'NEWSTOCK';
export const CHANGESTOCK = 'CHANGESTOCK';
export const ADDSTOCK = 'ADDSTOCK';
export const DELETESTOCK = 'DELETESTOCK';
export const NEWPRODUCT = 'NEWPRODUCT';
export const CHANGEPRODUCT = 'CHANGEPRODUCT';
export const ADDPRODUCT = 'ADDPRODUCT';
export const DELETEPRODUCT = 'DELETEPRODUCT';

export interface StockState {
    products: Product[];
    stock: Stock[];
}

export const initialModalObject: StockState = {
    products: [
        {
            id: null,
            company_id: null,
            name: null,
            code: null,
            description: null,
            quantity: null,
            cost_price: null,
            sale_price: null,
            category_id: null,
            created_at: null,
            updated_at: null,
            deleted_at: null,
        }
  ],
    stock: [
        {
            id: null,
            product_id: null,
            company_id: null,
            order_id: null,
            sale_id: null,
            quantity: null,
            type: null,
            created_at: null,
            updated_at: null,
            deleted_at: null
        }
    ]
}

export const gridReducer: Reducer<any> = (state: StockState, action: Action) => {
    const newState: StockState = initialModalObject;
    switch (action.type) {
        case 'NEWSTOCK':
            state.products.map( p => p.quantity = action.payload);
            return state;
        case 'ADDSTOCK':
            state.stock = [...state.stock, action.payload];
            state.products.map( p =>
                p.quantity = action.payload);
            return state;
        case 'CHANGESTOCK':
            state.stock.map(item => {
                return item.id === action.payload.id ? action.payload : item;
            });
            state.products.map( p =>
                p.quantity = action.payload.quantity);
            return state;
        case 'DELETESTOCK':
            state.products.map( p => {
                    if (action.payload.find( s => s.product_id === p.id)) {
                        p.quantity = 0;
                    };
                    return p;
                }
            );
            return state.stock.filter(item => {
                return item.id !== action.payload.id;
            })
        case 'NEWPRODUCT':
            newState.products = action.payload;
            return newState;
        case 'ADDPRODUCT':
            state.products = [...state.products, action.payload];
            return state;
        case 'CHANGEPRODUCT':
            return state.products.map(item => {
                return item.id === action.payload.id ? action.payload : item;
            });
        case 'DELETEPRODUCT':
            return state.products.filter(item => {
                return item.id !== action.payload.id;
            })
        default:
            return state;
    }
}