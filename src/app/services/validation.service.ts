import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class ValidationService {
  getValidationErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      required: 'Este campo es obligatorio y no puede ser inválido',
      email: 'Por favor ingrese un email válido',
      invalidNumber: 'Este campo debe ser numérico',
      invalidAlphanumber: 'Este campo debe ser alfanumérico',
      invalidCero: 'El valor no puede ser 0',
      minlength: `El valor no puede ser inferior a ${validatorValue.requiredLength} caracteres`,
      maxlength: `El valor no puede ser superior a ${validatorValue.requiredLength} caracteres`,
      emptySpace: `Este campo no puede contener solo espacios`,
      min: `El número no puede ser inferior a ${validatorValue.min}`,
      max: `El número no puede ser superior a ${validatorValue.maxValue}`,
      dateValidator: 'La fecha de nacimiento debe ser menor a la fecha actual'
    };

    return config[validatorName];
  }

  dateValidator(control: any) {
    const actualDate = new Date();
    actualDate.setHours(0);
    actualDate.setMinutes(0);
    actualDate.setSeconds(0);
    actualDate.setMilliseconds(0);
    const formDate = new Date(control.value);
    formDate.setHours(formDate.getHours() + 3);
    if (formDate < actualDate) {
      return null;
    } else if (formDate instanceof Date && !isNaN(formDate.getTime())) {
      return { dateValidator: 'bad date' };
    }
  }

  maxLengthValidator(control: AbstractControl) {
    return control.value > 50 ? { maxlength: true } : null;
  }

  maxValidator(max: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value > max) {
        return { max: { error: true, maxValue: max } };
      }
      return null;
    };
  }

  notCeroValidator(control: AbstractControl) {
    return !control.value || Number(control.value) !== 0 ? null : { invalidCero: true };
  }

  numberValidator(control: AbstractControl) {
    return (control.value !== null && String(control.value).match(/^\d*$/)) || !control.value ? null : { invalidNumber: true };
  }

  alphanumericValidator(control: AbstractControl) {
    return (control.value !== null && String(control.value).match(/^[a-z0-9]+$/i)) || !control.value ? null : { invalidAlphanumber: true };
  }

  emptySpaceValidator(control: AbstractControl) {
    if (typeof control.value === 'string') {
      return (control.value !== null && control.value.replace(/\s/g, '').length > 0) || !control.value ? null : { emptySpace: true };
    }
  }
}
