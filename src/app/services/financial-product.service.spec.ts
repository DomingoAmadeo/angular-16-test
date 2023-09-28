import { TestBed } from '@angular/core/testing';

import { FinancialProductService } from './financial-product.service';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';

describe('FinancialProductService', () => {
  let service: FinancialProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ ApiService ]
    });
    service = TestBed.inject(FinancialProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reach the server', (done) => {
    service.getProducts().subscribe(
      response => {
        expect(Array.isArray(response)).toBe(Array.isArray([]));
        done();
      }
    );
  });

  it('should try to create a product and verify its id', (done) => {
    service.createFinancialProduct({
      id: "crd-trj",
      name: "Credit Card",
      description: "Card under credit consumption type",
      logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      date_release: "2027-02-01",
      date_revision: "2028-02-01"
    }).subscribe({
        next: () => {
          service.validateId("crd-trj").subscribe(
            response => {
              expect(Array.isArray(response)).toBe(true);
              done();
            }
          )
        },
        error: () => {
          service.validateId('1234').subscribe(
            response => {              
              expect(response).toBe(true);
              done();
            }
          )
        },
    });
  });
});
