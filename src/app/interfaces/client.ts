export interface Client {
  id: number;
  company_id: number;
  created_at: String;
  updated_at: String;
  deleted_at: String;
  name: String;
  fantasyName: String;
  email: String;
  place: String;
  codigoPostal: String;
  codigoProvincia: String;
  address: String;
  telephone: number;
  cuit: String;
  tipoDocumento: string;
  documento: string;
  condicionDeVenta: string;
  web: String;
  responsableInscripto: Boolean;
  excento: Boolean;
  responsableMonotributo: Boolean;
  cuentasGenerales: String;
  type?: string;
  sale_point: string;
  start_date: string;
}
