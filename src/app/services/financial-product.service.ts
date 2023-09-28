import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { FinancialProduct } from '../core/models/financialProduct';
import { FinancialProductForAddDTO } from '../core/models/financialProductForAddDTO';

@Injectable({
  providedIn: 'root'
})
export class FinancialProductService {
  controller: string = "bp/products";
  
  constructor(private apiService: ApiService) {}

  getProducts(): Observable<FinancialProduct[]> {
    return this.apiService.get(`${this.controller}`);
  }

  validateId(id: string): Observable<boolean> {
    return this.apiService.get(`${this.controller}/verification?id=${id}`);
  }

  createFinancialProduct(data: FinancialProductForAddDTO): Observable<FinancialProduct> {
    return this.apiService.post(this.controller, data);
  }
}