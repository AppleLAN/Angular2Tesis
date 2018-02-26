import { NotificationsService } from 'angular2-notifications';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvidersService } from '../../../services/providers.service';
import { Observable } from 'rxjs/Rx';
import { Provider } from '../../../interfaces/provider';
import { initialModalObject } from '../reducers/grid.reducer';
declare var jQuery: any;

@Component({
  selector: 'app-provider-modal',
  templateUrl: './providers.modal.html',
  styleUrls: ['.././providers.component.scss'],

})

export class ProviderModal implements OnInit {
  providerStorage: Observable<Provider[]>
  providers: Provider;
  providerForm: FormGroup;
  error: String;
  providerFormEmptyObject = initialModalObject;
  options: any;

  constructor(
    private fb: FormBuilder,
    private providersService: ProvidersService,
    private ns: NotificationsService) {
      this.options = {
        timeOut: 3000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: true
      };
  }
  ngOnInit() {
    this.providerForm = this.fb.group({
      id: [''],
      company_id: [''],
      created_at: [''],
      updated_at: [''],
      deleted_at: [''],
      new: [true],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      fantasyName: ['', [Validators.required, Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      place: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      codigoPostal: ['', [Validators.minLength(4), Validators.maxLength(30)]],
      codigoProvincia: ['', [Validators.minLength(4), Validators.maxLength(30)]],
      address: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      telephone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
      cuit: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      web: ['', [Validators.minLength(6), Validators.maxLength(30)]],
      iib: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      pib: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      epib: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      responsableInscripto: ['', []],
      excento: ['', []],
      responsableMonotributo: ['', []],
      ivaInscripto: ['', []],
      precioLista: ['', [Validators.required]],
      condicionDeVenta: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      limiteDeCredito: ['', [Validators.required]],
      numeroDeInscripcionesIB: ['', [Validators.required]],
      cuentasGenerales: ['', [Validators.required, Validators.minLength(6)]],
      percepcionDeGanancia: ['', [Validators.required]],
    });
    this.providerStorage = this.providersService.getProviderStorage();
    this.providersService.getProviders().subscribe();
  }

  changeInformation(provider: Provider) {
    const formProvider: any = provider;
    formProvider.new = false;
    this.providerForm.setValue(formProvider);
    jQuery('.ui.modal.provider-modal').modal('show');
  }

  openNewProviderModal() {
    let providerFormObject: any;
    providerFormObject = this.providerFormEmptyObject;
    providerFormObject.new = true;
    this.providerForm.setValue(providerFormObject);
    jQuery('.ui.modal.provider-modal').modal('show');
  }

  isNew(providerForm: any) {
    if (providerForm.controls.new.value) {
      return true;
    } else {
      return false;
    }
  }

  addProvider({ value }: { value: Provider }) {
    this.providersService.addProvider(value).subscribe(
      () => this.ns.success('Perfecto!', 'Su proveedor ha sido agregado'),
      error => this.ns.error('Error!', error)
    );
  }

  updateProvider({ value }: { value: Provider }) {
    this.providersService.updateProvider(value).subscribe(
      () => this.ns.success('Perfecto!', 'Su proveedor ha sido actualizado'),
      error => this.ns.error('Error!', error)
    );
  }

   deleteProvider({ value }: { value: Provider }) {
    this.providersService.deleteProvider(value).subscribe(
      () => this.ns.success('Perfecto!', 'Su proveedor ha sido eliminado'),
      error => this.ns.error('Error!', error)
    );
  }
}
