import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FinancialProductFormComponent } from './financial-product-form.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FinancialProductService } from '../../services/financial-product.service';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';
import { firstValueFrom, of } from 'rxjs';

describe('FinancialProductFormComponent', () => {
  let component: FinancialProductFormComponent;
  let fixture: ComponentFixture<FinancialProductFormComponent>;
  let toastService: ToastService;
  let routerService: Router;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialProductFormComponent],
      imports: [HttpClientTestingModule],
      providers: [FinancialProductService]
    });
    fixture = TestBed.createComponent(FinancialProductFormComponent);
    component = fixture.componentInstance;
    toastService = TestBed.inject(ToastService);
    routerService = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
    jest.spyOn(toastService, 'showToast').mockImplementation(() => firstValueFrom(of(true)));
    jest.spyOn(routerService, 'navigateByUrl').mockImplementation(() => firstValueFrom(of(true)));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });  

  it('should change date', () => {
    const event = { target: { value: '2023-09-27' } };
    const expectedNewDate = new Date('2023-09-27');
    expectedNewDate.setFullYear(expectedNewDate.getFullYear() + 1);
    const expectedDateString = expectedNewDate.toISOString().split('T')[0];
    expectedNewDate.setDate(expectedNewDate.getDate() + 1);
    const expectedReleaseDate = expectedNewDate.toLocaleDateString('en-US');
    
    // @ts-ignore
    component.changeDate(event);
    expect(component.productForm.controls.date_revision.value).toBe(expectedDateString);
    expect(component.releaseDate).toBe(expectedReleaseDate);
  });

  it('should reset form', () => {
    component.productForm.setValue({
      date_release: '1',
      date_revision: '1',
      description: '1',
      id: '1',
      logo: '1',
      name: '1'
    });
    component.reset();

    expect(Object.values(component.productForm.getRawValue()).every(x => x === null || x === '')).toBe(true);
    expect(component.releaseDate).toBe('');
  });

  it('should submit the form and call services', waitForAsync (async () => {
    const product = {
      id: "crd-trj",
      name: "Credit Card",
      description: "Card under credit consumption type",
      logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      date_release: "2027-02-01",
      date_revision: "2028-02-01"
    };
    component.productForm.setValue(product);
    
    component.submit();
    const request = httpMock.expectOne('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products');
    expect( request.request.method ).toBe('POST');
    request.flush( product );
    
    expect(toastService.showToast).toHaveBeenCalledWith('success', 'Producto creado');
    expect(routerService.navigateByUrl).toHaveBeenCalledWith('/home');
  }));
});
