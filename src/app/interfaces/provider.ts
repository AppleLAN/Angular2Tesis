export interface Provider {
  id: number;
  company_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  name: string;
  fantasyName: string;
  email: string;
  place: string;
  codigoPostal: string;
  codigoProvincia: string;
  address: string;
  telephone: number;
  cuit: string;
  tipoDocumento: string;
  documento: string;
  ganancia: boolean;
  web: string;
  responsableInscripto: Boolean;
  excento: Boolean;
  responsableMonotributo: Boolean;
  cuentasGenerales: string;
  percepcionDeGanancia: number;
  sale_point: string;
  start_date: string;
}
