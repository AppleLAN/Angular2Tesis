import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Observable } from 'rxjs/Rx';
import { Provider } from '../../../interfaces/provider';
import { ProvidersService } from '../../../services/providers.service';
import { SharedService, RetentionTypes, DocumentTypes } from '../../../services/shared.service';
import { SpinnerService } from '../../../services/spinner.service';
import { ValidationService } from '../../../services/validation.service';
import { initialModalObject } from '../reducers/grid.reducer';
declare var jQuery: any;

@Component({
  selector: 'app-provider-modal',
  templateUrl: './providers.modal.html',
  styleUrls: ['.././providers.component.scss']
})
export class ProviderModal implements OnInit {
  documentTypes = DocumentTypes;
  retentionTypes = RetentionTypes;
  providerStorage: Observable<Provider[]>;
  providers: Provider;
  providerForm: FormGroup;
  error: String;
  providerFormEmptyObject = initialModalObject;
  options: any;
  cuenta: any = null;
  tipoDocumento: string;

  constructor(
    private fb: FormBuilder,
    private providersService: ProvidersService,
    private ns: NotificationsService,
    private sharedService: SharedService,
    private spinnerService: SpinnerService,
    private vs: ValidationService
  ) {
    this.options = {
      timeOut: 3000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    };
  }

  ngOnInit() {
    const retentionTypes = this.sharedService.generateMap(this.retentionTypes, ['', []]);
    const retentionPercentages = this.sharedService.generateMap(this.retentionTypes, [{ value: '', disabled: true }, []], 'Percentage');

    this.providerForm = this.fb.group({
      id: [''],
      company_id: [''],
      new: [true],
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30), this.vs.emptySpaceValidator]],
      fantasyName: ['', [Validators.required, Validators.maxLength(30), this.vs.emptySpaceValidator]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(30), this.vs.emptySpaceValidator]],
      place: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), this.vs.emptySpaceValidator]],
      codigoPostal: [
        '',
        [Validators.required, Validators.min(0), Validators.minLength(4), Validators.maxLength(30), this.vs.emptySpaceValidator]
      ],
      codigoProvincia: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.min(0), this.vs.emptySpaceValidator]
      ],
      address: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), this.vs.emptySpaceValidator]],
      telephone: [
        '',
        [Validators.required, Validators.min(0), Validators.minLength(9), Validators.maxLength(9), this.vs.emptySpaceValidator]
      ],
      cuit: ['', [Validators.required, Validators.min(0), Validators.minLength(11), Validators.maxLength(11), this.vs.emptySpaceValidator]],
      tipoDocumento: ['', [Validators.required]],
      documento: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), this.vs.emptySpaceValidator]],
      web: ['', [Validators.minLength(6), Validators.maxLength(30), this.vs.emptySpaceValidator]],
      ganancia: ['', []],
      responsableInscripto: ['', []],
      excento: ['', []],
      responsableMonotributo: ['', []],
      cuentasGenerales: ['Cuenta General', []],
      ...retentionTypes,
      ...retentionPercentages
    });
    this.providerStorage = this.providersService.getProviderStorage();
    this.providersService.getProviders().subscribe();
  }

  checkDocumentType(event: any) {
    this.sharedService.checkDocumentType(event, this.providerForm);
  }

  responsableChange(formControl: any) {
    this.sharedService.responsableChange(formControl, this.providerForm);
  }

  retencionChange() {
    const values = this.sharedService.retencionChange(this.providerForm);
    this.retentionTypes.forEach(item => {
      const found = values.find(value => item.value === value);
      if (found) {
        this.providerForm
          .get(item.value + 'Percentage')
          .setValidators([Validators.required, this.vs.emptySpaceValidator, Validators.min(0), Validators.max(100)]);
        this.providerForm.get(item.value + 'Percentage').enable();
      } else {
        this.providerForm.get(item.value + 'Percentage').setValidators([]);
        this.providerForm.get(item.value + 'Percentage').reset();
        this.providerForm.get(item.value + 'Percentage').disable();
      }
    });
  }

  onChangeRetencion(event: any) {
    this.providerForm.get('retencion').setValue(event);
  }

  changeInformation(provider: Provider) {
    this.providerForm.reset();
    const formProvider: any = provider;
    formProvider.new = false;
    this.providerForm.get('fantasyName').disable();
    this.providerForm.get('cuit').disable();
    this.providerForm.patchValue(formProvider);
    this.tipoDocumento = formProvider.tipoDocumento;
    this.providerForm.get('tipoDocumento').setValue(formProvider.tipoDocumento);
    this.cuenta = formProvider.cuentasGenerales;
    this.retencionChange();
    jQuery('.ui.modal.provider-modal').modal('show');
  }

  openNewProviderModal() {
    this.providerForm.reset();
    let providerFormObject: any;
    providerFormObject = this.providerFormEmptyObject;
    providerFormObject.new = true;
    this.providerForm.get('fantasyName').enable();
    this.providerForm.get('cuit').enable();
    this.providerForm.patchValue(providerFormObject);
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
    this.providersService.addProvider(this.providerForm.getRawValue()).subscribe(
      () => {
        this.spinnerService.displayLoader(false);
        this.ns.success('Perfecto!', 'Su proveedor ha sido agregado');
        jQuery('.ui.modal.provider-modal').modal('hide');
      },
      error => {
        this.spinnerService.displayLoader(false);
        this.ns.error('Error!', error.error.error);
      }
    );
  }

  updateProvider({ value }: { value: Provider }) {
    this.spinnerService.displayLoader(true);
    this.providersService.updateProvider(this.providerForm.getRawValue()).subscribe(
      () => {
        this.spinnerService.displayLoader(false);
        this.ns.success('Perfecto!', 'Su proveedor ha sido actualizado');
        jQuery('.ui.modal.provider-modal').modal('hide');
      },
      error => {
        this.spinnerService.displayLoader(false);
        this.ns.error('Error!', error.error.error);
      }
    );
  }

  deleteProvider({ value }: { value: Provider }) {
    this.spinnerService.displayLoader(true);
    this.providersService.deleteProvider(this.providerForm.getRawValue()).subscribe(
      () => {
        this.spinnerService.displayLoader(false);
        this.ns.success('Perfecto!', 'Su proveedor ha sido eliminado');
        jQuery('.ui.modal.provider-modal').modal('hide');
      },
      error => {
        this.spinnerService.displayLoader(false);
        this.ns.error('Error!', error.error.error);
      }
    );
  }
}
