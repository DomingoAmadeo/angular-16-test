import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinancialProductFormComponent } from './financial-product-form/financial-product-form.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { ApiService } from '../services/api.service';
import { ToastService } from '../services/toast.service';



@NgModule({
  declarations: [
    HomeComponent,
    FinancialProductFormComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiService, 
    ToastService
  ]
})
export class SharedModule { }
