import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '../../../../services/validation.service';

@Component({
  selector: 'app-input-error-messages',
  template: `
    <div class="error-messages" *ngIf="errorMessage !== null">
      {{ errorMessage }}
    </div>
  `,
  styles: ['.error-messages {color: #9F3A38; padding: 0.5rem 0 0.9375rem 0;}']
})
export class InputErrorMessagesComponent {
  @Input() control: FormControl;
  @Input() submitted: boolean;

  constructor(private vs: ValidationService) {}

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (
        (this.control.errors.hasOwnProperty(propertyName) && this.control.dirty) ||
        (this.control.pristine && this.submitted)
      ) {
        return this.vs.getValidationErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
  }
}
