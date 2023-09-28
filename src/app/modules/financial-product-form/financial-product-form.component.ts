import { HttpErrorResponse } from '@angular/common/http';
import { Component, WritableSignal, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { minToday } from '../../core/helpers/validators.helper';
import { FinancialProductService } from '../../services/financial-product.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-financial-product-form',
  templateUrl: './financial-product-form.component.html',
  styleUrls: ['./financial-product-form.component.css']
})
export class FinancialProductFormComponent {

  releaseDate: string;
  validId: WritableSignal<string> = signal('');
  validId$: Observable<string> = toObservable(this.validId);
  validation$: Observable<boolean>;

  productForm = new FormGroup({
    id: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    name: new FormControl<string>(undefined, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]),
    description: new FormControl<string>(undefined, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200)
    ]),
    logo: new FormControl<string>(undefined, Validators.required),
    date_release: new FormControl<string>(undefined, [
      Validators.required,
      minToday()
    ]),
    date_revision: new FormControl<string>(undefined, [
      Validators.required
    ])
  })
  
  constructor(
    private financialService: FinancialProductService,
    private router: Router,
    private toastService: ToastService
  ) {
    this.validation$ = this.validId$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((id) => id === '' ? of(false) : financialService.validateId(id)),
      catchError((err: HttpErrorResponse) => {
        toastService.showToast('error', err.error)
        return of(false);
      })
    );
  }

  changeDate(e: Event){
    let newDate = new Date((e.target as HTMLInputElement).value);
    newDate.setFullYear(newDate.getFullYear() + 1);
    this.productForm.controls.date_revision.patchValue(newDate.toISOString().split('T')[0]);
    newDate.setDate(newDate.getDate() + 1)
    this.releaseDate = newDate.toLocaleDateString("en-US");
  }

  reset(){
    this.productForm.reset();
    this.releaseDate = ''
    this.toastService.showToast('success', 'Formulario Reestablecido')
  }

  submit() {
    this.financialService.createFinancialProduct(this.productForm.getRawValue()).subscribe({
      error: (err) => this.toastService.showToast('error', err.error),
      next: (response) => {
        this.toastService.showToast('success', 'Producto creado');
        this.router.navigateByUrl('/home');
      }
    });
  }
}
