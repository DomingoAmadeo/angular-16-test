import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minToday(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value == null) {
      return null;
    }

    const inputDate = new Date(control.value);    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (inputDate < today) {
      return {
        'min-today': {
          'actual': control.value
        }
      };
    }    
    return null;
  };
}