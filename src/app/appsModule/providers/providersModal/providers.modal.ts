import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs/Rx';
import { Provider } from '../../../interfaces/provider';
import { ProvidersService } from '../../../services/providers.service';
import { SharedService } from '../../../services/shared.service';
import { SpinnerService } from '../../../services/spinner.service';
import { initialModalObject } from '../reducers/grid.reducer';
declare var jQuery: any;

@Component({
  selector: 'app-provider-modal',
  templateUrl: './providers.modal.html',
  styleUrls: ['.././providers.component.scss']
})
export class ProviderModal implements OnInit {
  providerStorage: Observable<Provider[]>;
  providers: Provider;
  providerForm: FormGroup;
  error: String;
  providerFormEmptyObject = initialModalObject;
  options: any;

  constructor(
    private fb: FormBuilder,
    private providersService: ProvidersService,
    private ns: NotificationsService,
    private sharedService: SharedService,
    private spinnerService: SpinnerService
  ) {
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
      name: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(30)]
      ],
      fantasyName: ['', [Validators.required, Validators.maxLength(30)]],
      email: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      place: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      codigoPostal: ['', [Validators.minLength(4), Validators.maxLength(30)]],
      codigoProvincia: [
        '',
        [Validators.minLength(4), Validators.maxLength(30)]
      ],
      address: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      telephone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11)
        ]
      ],
      cuit: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11)
        ]
      ],
      web: ['', [Validators.minLength(6), Validators.maxLength(30)]],
      iib: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      pib: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      epib: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      responsableInscripto: ['', []],
      excento: ['', []],
      responsableMonotributo: ['', []],
      ivaInscripto: ['', []],
      precioLista: ['', [Validators.required]],
      condicionDeVenta: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ],
      limiteDeCredito: ['', [Validators.required]],
      numeroDeInscripcionesIB: ['', [Validators.required]],
      cuentasGenerales: ['', [Validators.required, Validators.minLength(6)]],
      percepcionDeGanancia: ['', [Validators.required]]
    });
    this.providerStorage = this.providersService.getProviderStorage();
    this.providersService.getProviders().subscribe();
  }

  responsableChange(formControl: FormControl) {
    this.sharedService.responsableChange(formControl, this.providerForm);
  }

  changeInformation(provider: Provider) {
    this.providerForm.reset();
    const formProvider: any = provider;
    formProvider.new = false;
    this.providerForm.setValue(formProvider);
    jQuery('.ui.modal.provider-modal').modal('show');
  }

  openNewProviderModal() {
    this.providerForm.reset();
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
    this.spinnerService.displayLoader(true);
    this.providersService.addProvider(value).subscribe(
      () => {
        this.spinnerService.displayLoader(false);
        this.ns.success('Perfecto!', 'Su proveedor ha sido agregado');
        jQuery('.ui.modal.provider-modal').modal('hide');
      },
      error => {
        this.spinnerService.displayLoader(false);
        this.ns.error('Error!', error);
      }
    );
  }

  updateProvider({ value }: { value: Provider }) {
    this.spinnerService.displayLoader(true);
    this.providersService.updateProvider(value).subscribe(
      () => {
        this.spinnerService.displayLoader(false);
        this.ns.success('Perfecto!', 'Su proveedor ha sido actualizado');
        jQuery('.ui.modal.provider-modal').modal('hide');
      },
      error => {
        this.spinnerService.displayLoader(false);
        this.ns.error('Error!', error);
      }
    );
  }

  deleteProvider({ value }: { value: Provider }) {
    this.spinnerService.displayLoader(true);
    this.providersService.deleteProvider(value).subscribe(
      () => {
        this.spinnerService.displayLoader(false);
        this.ns.success('Perfecto!', 'Su proveedor ha sido eliminado');
        jQuery('.ui.modal.provider-modal').modal('hide');
      },
      error => {
        this.spinnerService.displayLoader(false);
        this.ns.error('Error!', error);
      }
    );
  }
}
