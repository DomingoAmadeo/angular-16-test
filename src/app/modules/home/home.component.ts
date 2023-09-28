import { Component, WritableSignal, signal } from '@angular/core';
import { Observable, catchError, combineLatest, debounceTime, distinctUntilChanged, map, mergeMap, of, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { FinancialProduct } from '../../core/models/financialProduct';
import { FinancialProductService } from '../../services/financial-product.service';
import { PagedResult } from '../../core/models/pagedResult';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isLoading: boolean = true;

  // Reactive programming
  currentPage: WritableSignal<number> = signal(1);
  currentPage$: Observable<number> = toObservable(this.currentPage);
  pageSize: WritableSignal<number> = signal(5);  
  pageSize$: Observable<number> = toObservable(this.pageSize);
  searchText: WritableSignal<string> = signal('');
  searchText$: Observable<string> = toObservable(this.searchText);
  result$: Observable<PagedResult<FinancialProduct>>;

  constructor(
    private financialService: FinancialProductService,
    private toastService: ToastService
    ) {
    this.result$ = this.searchText$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      mergeMap((input: string) => {
        return combineLatest([
          of(input), this.currentPage$, this.pageSize$, 
          this.financialService.getProducts().pipe(catchError((err: HttpErrorResponse) => {
            toastService.showToast('error', err.error)
            return of([]);
          }))
        ]);
      }),
      map(([input, currentPage, pageSize, products]) => {
        if (input) {
          products = products.filter(p => p.name.toUpperCase().includes(input.toUpperCase()))
        }        
        let count = products.length;
        let lastPage = Math.ceil(count / pageSize)
        products = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);
        return {
          contents: products,
          totalCount: count,
          currentPage: currentPage,
          lastPage: lastPage
        };
      }),
      tap((res) => {
        this.isLoading = false;
        if (res.lastPage < res.currentPage) {
          this.currentPage.set(1);
        }
      })
    );
  }
}
