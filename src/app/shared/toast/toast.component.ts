import { Component } from '@angular/core';
import { ToastConfig } from 'src/app/core/models/toastConfig';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent {
  toasts: ToastConfig[];

  constructor(public toastService: ToastService) {
    this.toasts = toastService.toasts;
  }

  closeToast(id: number) {
    this.toastService.removeToast(id);
  }
}
