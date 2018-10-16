import { Action } from './../../../interfaces/action';
import { Reducer } from './../../../interfaces/reducer';
import { Provider } from './../../../interfaces/provider';

export const NEWPROVIDERS = 'NEWPROVIDERS';
export const CHANGEPROVIDER = 'CHANGEPROVIDER';
export const ADDPROVIDER = 'ADDPROVIDER';
export const DELETEPROVIDER = 'DELETEPROVIDER';

export const initialModalObject: Provider = {
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
  web: '',
  iib: '',
  pib: '',
  epib: '',
  responsableInscripto: false,
  excento: false,
  responsableMonotributo: false,
  ivaInscripto: false,
  precioLista: null,
  condicionDeVenta: '',
  limiteDeCredito: null,
  numeroDeInscripcionesIB: null,
  cuentasGenerales: '',
  percepcionDeGanancia: null
};

export const gridReducer: Reducer<any> = (
  state: Provider[],
  action: Action
) => {
  switch (action.type) {
    case 'NEWPROVIDERS':
      return action.payload;
    case 'ADDPROVIDER':
      return [...state, action.payload];
    case 'CHANGEPROVIDER':
      return state.map(item => {
        return item.id === action.payload.id ? action.payload : item;
      });
    case 'DELETEPROVIDER':
      return state.filter(item => {
        return item.id !== action.payload.id;
      });
    default:
      return state;
  }
};
