export interface Client {
  id: number,
  company_id: number,
  created_at:  String,
  updated_at:  String,
  deleted_at:  String,
  name: String,
  fantasyName: String,
  email: String,
  place: String,
  codigoPostal: String,
  codigoProvincia: String,
  address: String,
  telephone: number,
  cuit: String,
  web: String,
  iib: String,
  pib: String,
  epib: String,
  responsableInscripto: Boolean,
  excento: Boolean,
  responsableMonotributo: Boolean,
  ivaInscripto: Boolean,
  precioLista: number,
  condicionDeVenta: String,
  limiteDeCredito: number,
  numeroDeInscripcionesIB: number,
  cuentasGenerales: String,
  percepcionDeGanancia: number,
  type?: string;
  sale_point: string;
  start_date: string;
}
