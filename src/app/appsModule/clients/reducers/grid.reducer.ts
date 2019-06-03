import { Action } from './../../../interfaces/action';
import { Reducer } from './../../../interfaces/reducer';
import { Client } from './../../../interfaces/client';

export const NEWCLIENTS = 'NEWCLIENTS';
export const CHANGECLIENT = 'CHANGECLIENT';
export const ADDCLIENT = 'ADDCLIENT';
export const DELETECLIENT = 'DELETECLIENT';

export const initialModalObject: Client = {
  id: null,
  company_id: null,
  created_at: '',
  updated_at: '',
  deleted_at: '',
  name: '',
  fantasyName: '',
  email: '',
  place: '',
  codigoPostal: '',
  codigoProvincia: '',
  address: '',
  telephone: null,
  cuit: '',
  tipoDocumento: '',
  documento: '',
  web: '',
  responsableInscripto: false,
  excento: false,
  responsableMonotributo: false,
  cuentasGenerales: '',
  condicionDeVenta: '',
  G: false,
  IIBB: false,
  IVA: false,
  SUS: false,
  GPercentage: null,
  IIBBPercentage: null,
  IVAPercentage: null,
  SUSPercentage: null
};

export const gridReducer: Reducer<any> = (state: Client[], action: Action) => {
  switch (action.type) {
    case 'NEWCLIENTS':
      return action.payload;
    case 'ADDCLIENT':
      return [...state, action.payload];
    case 'CHANGECLIENT':
      return state.map(item => {
        return item.id === action.payload.id ? (item = action.payload) : item;
      });
    case 'DELETECLIENT':
      return state.filter(item => {
        return item.id !== action.payload.id;
      });
    default:
      return state;
  }
};
