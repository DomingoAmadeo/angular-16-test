import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { FinancialProductService } from '../../services/financial-product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule],
      providers: [FinancialProductService]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 5 rows inside the skeleton', () => {
    const rows = document.querySelector('tbody').querySelectorAll('tr');
    expect(rows.length).toBe(component.pageSize());
  });

  it('should load an array of data', waitForAsync (async () => {
    const products = [{
      id: "crd-trj",
      name: "Credit Card",
      description: "Card under credit consumption type",
      logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      date_release: "2027-02-01",
      date_revision: "2028-02-01"
    },
    {
      id: "crd-trj",
      name: "Credit Card",
      description: "Card under credit consumption type",
      logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      date_release: "2027-02-01",
      date_revision: "2028-02-01"
    }];    
    await new Promise((resolve) => { setTimeout(resolve, 100) })

    const request = httpMock.expectOne('https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products');
    expect( request.request.method ).toBe('GET');
    request.flush( products );    
    fixture.detectChanges();
    
    const rows = document.querySelector('tbody').querySelectorAll('tr');
    expect(rows.length).toBe(products.length);
  }));
});