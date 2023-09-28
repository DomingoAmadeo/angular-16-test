import { FormControl } from '@angular/forms';
import { minToday } from './validators.helper';

describe('minToday Validator', () => {
  it('should return null for a valid date', () => {
    const control = new FormControl(new Date().toISOString().split('T')[0]);
    const validator = minToday();
    const result = validator(control);
    expect(result).toBeNull();
  });

  it('should return an error for a date in the past', () => {
    const control = new FormControl('2023-09-01');
    const validator = minToday();
    const result = validator(control);
    expect(result).toEqual({ 'min-today': { 'actual': '2023-09-01' } });
  });

  it('should return null for a null control value', () => {
    const control = new FormControl(null);
    const validator = minToday();
    const result = validator(control);
    expect(result).toBeNull();
  });
});