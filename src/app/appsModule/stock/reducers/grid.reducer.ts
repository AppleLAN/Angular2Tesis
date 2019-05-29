import { Action } from './../../../interfaces/action';
import { Reducer } from './../../../interfaces/reducer';
import { Stock, Product } from './../../../interfaces/stock';
import { PriceList } from './../../../interfaces/price.list';

export const NEWSTOCK = 'NEWSTOCK';
export const CHANGESTOCK = 'CHANGESTOCK';
export const ADDSTOCK = 'ADDSTOCK';
export const DELETESTOCK = 'DELETESTOCK';

export const NEWPRODUCT = 'NEWPRODUCT';
export const CHANGEPRODUCT = 'CHANGEPRODUCT';
export const ADDPRODUCT = 'ADDPRODUCT';
export const DELETEPRODUCT = 'DELETEPRODUCT';

export const NEWPRICELISTS = 'NEWPRICELISTS';
export const CHANGEPRICELIST = 'CHANGEPRICELIST';
export const ADDPRICELIST = 'ADDPRICELIST';
export const DELETEPRICELIST = 'DELETEPRICELIST';
export interface StockState {
  products: Product[];
  stock: Stock[];
  priceLists: PriceList[];
}

export const initialModalObject: StockState = {
  products: [
    {
      id: null,
      company_id: null,
      provider_id: null,
      name: null,
      description: null,
      costPrice: null,
      netPrice: null,
      condition: null,
      productType: null,
      importRight: null,
      tentativeCost: null,
      providerName: null,
      type: null,
      quantity: null
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
  ],
  priceLists: [
    {
      products: null,
      description: null,
      name: null,
      percentage: null
    }
  ]
};

export const gridReducer: Reducer<any> = (state: StockState, action: Action) => {
  const newState: StockState = { ...initialModalObject };

  switch (action.type) {
    case 'NEWSTOCK':
      state.products.map(p => (p.quantity = action.payload));
      return { ...state };
    case 'ADDSTOCK':
      state.stock = [...state.stock, action.payload];
      state.products.map(p => (p.quantity = action.payload));
      return { ...state };
    case 'CHANGESTOCK':
      state.stock.map(item => {
        return item.id === action.payload.id ? action.payload : item;
      });
      state.products.map(p => (p.quantity = action.payload.quantity));
      return { ...state };
    case 'DELETESTOCK':
      state.products.map(p => {
        if (action.payload.find((s: Stock) => s.product_id === p.id)) {
          p.quantity = 0;
        }
        return p;
      });
      return { ...state }.stock.filter(item => {
        return item.id !== action.payload.id;
      });

    case 'NEWPRODUCT':
      action.payload.provider_id = Number(action.payload.provider_id);
      newState.products = action.payload;
      return newState;
    case 'ADDPRODUCT':
      action.payload.provider_id = Number(action.payload.provider_id);
      state.products = [...state.products, action.payload];
      return { ...state };
    case 'CHANGEPRODUCT':
      action.payload.provider_id = Number(action.payload.provider_id);
      state.products = state.products.map(item => (item.id === action.payload.id ? action.payload : item));
      return { ...state };
    case 'DELETEPRODUCT':
      state.products = state.products.filter(item => item.id !== action.payload.id);
      return { ...state };

    case 'NEWPRICELISTS':
      newState.priceLists = action.payload;
      return newState;
    case 'ADDPRICELIST':
      state.priceLists = [...state.priceLists, action.payload];
      return { ...state };
    case 'CHANGEPRICELIST':
      action.payload.name = Number(action.payload.name);
      state.priceLists = state.priceLists.map(item => (item.name === action.payload.name ? action.payload : item));
      return { ...state };
    case 'DELETEPRICELIST':
      state.priceLists = state.priceLists.filter(item => item.name !== action.payload.name);
      return { ...state };
    default:
      return state;
  }
};
