import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ValidationService } from './validation.service';

export const DocumentTypes = [
  { label: 'Documento Único', value: 'DNI' },
  { label: 'Libreta de Enrolamiento', value: 'LE' },
  { label: 'Libreta Cívica', value: 'LC' },
  { label: 'Pasaporte', value: 'PASAPORTE' },
  { label: 'Cédula', value: 'CEDULA' },
  { label: 'Cédula Extranjera', value: 'CE' }
];

export const SaleConditionTypes = [{ label: 'IVA', value: 'IVA' }, { label: 'Inscripción Ingresos Brutos', value: 'IIBB' }];

export const RetentionTypes = [
  { label: 'IVA', value: 'IVA' },
  { label: 'Inscripción Ingresos Brutos', value: 'IIBB' },
  { label: 'Ganancia', value: 'G' },
  { label: 'SUS', value: 'SUS' }
];
@Injectable()
export class SharedService {
  constructor(private vs: ValidationService) {}

  responsableChange(formControl: any, form: FormGroup) {
    const values = [form.get('responsableInscripto'), form.get('excento'), form.get('responsableMonotributo')];

    const turnToFalseValues = values.filter(filteredValue => filteredValue !== formControl);
    turnToFalseValues.forEach(turnedToFalse => {
      turnedToFalse.setValue(false);
    });
  }

  retencionChange(formControl: any, form: FormGroup) {
    return RetentionTypes.filter(item => !!form.get(item.value).value).map(item => item.value);
  }

  generateMap(arr: any, value: any, keyAddition?: string) {
    return arr.reduce(function(map: any, obj: any) {
      map[`${obj.value}${keyAddition ? keyAddition : ''}`] = value;
      return map;
    }, {});
  }

  checkDocumentType(event: any, form: any) {
    form.get('tipoDocumento').setValue(event);
    if (form.get('tipoDocumento').value !== 'PASAPORTE') {
      form
        .get('documento')
        .setValidators([Validators.maxLength(50), this.vs.numberValidator, Validators.required, this.vs.emptySpaceValidator]);
      form.get('documento').updateValueAndValidity();
    } else {
      form
        .get('documento')
        .setValidators([Validators.required, this.vs.emptySpaceValidator, Validators.maxLength(50), this.vs.alphanumericValidator]);
      form.get('documento').updateValueAndValidity();
    }
  }
}
