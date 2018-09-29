import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class SharedService {
  constructor() {}

  responsableChange(formControl: FormControl, form: FormGroup) {
    const values = [
      form.get('responsableInscripto'),
      form.get('excento'),
      form.get('responsableMonotributo'),
      form.get('ivaInscripto')
    ];

    let turnToFalseValues = values.filter(
      filteredValue => filteredValue !== formControl
    );
    turnToFalseValues.forEach(turnedToFalse => {
      turnedToFalse.setValue(false);
    });
  }
}
