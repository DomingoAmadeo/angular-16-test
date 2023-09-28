import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a success toast with default message', () => {
    service.showToast('success');
    expect(service.toasts.length).toBe(1);
    expect(service.toasts[0].template).toBe('success');
    expect(service.toasts[0].message).toBe('Exito');
  });

  it('should add an error toast with default message', () => {
    service.showToast('error');
    expect(service.toasts.length).toBe(1);
    expect(service.toasts[0].template).toBe('error');
    expect(service.toasts[0].message).toBe('Error');
  });

  it('should remove a toast by id', () => {
    const customToast = {
      id: 1,
      template: 'custom',
      delay: 2000,
      message: 'Custom Message'
    };
    service.show(customToast);
    service.removeToast(1);
    expect(service.toasts.length).toBe(0);
  });

  it('should not remove a non-existing toast', () => {
    const customToast = {
      id: 1,
      template: 'custom',
      delay: 2000,
      message: 'Custom Message'
    };
    service.show(customToast);
    service.removeToast(2);
    expect(service.toasts.length).toBe(1);
  });
});
