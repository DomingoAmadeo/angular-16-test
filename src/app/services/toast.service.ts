import { Injectable } from '@angular/core';
import { ToastConfig } from '../core/models/toastConfig';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: ToastConfig[] = [];
  private nextToastId = 1;

  showToast(type: 'success' | 'error', message: string = null, duration: number = 1000) {
    switch (type) {
      case 'success':
        this.show({
          id: this.nextToastId,
          template: 'success',
          delay: duration,
          message: message ?? 'Exito'
        });
        break;
      case 'error':
        this.show({
          id: this.nextToastId,
          template: 'error',
          delay: duration,
          message: message ?? 'Error'
        });
        break;
    }
  }

  show(toast: ToastConfig) {
    this.toasts.push(toast);
    this.nextToastId++
    setTimeout(() => {
      this.removeToast(toast.id);
    }, toast.delay);
  }

  removeToast(id: number) {
    const index = this.toasts.findIndex((toast) => toast.id === id);
    if (index !== -1) {
      this.toasts.splice(index, 1);
    }
  }
}
