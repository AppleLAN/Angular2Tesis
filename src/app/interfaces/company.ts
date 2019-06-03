export interface Company {
  id: number;
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
  web: String;
  responsableInscripto: Boolean;
  excento: Boolean;
  responsableMonotributo: Boolean;
  sale_point: string;
  cuentasGenerales: String;
  type?: string;
}
