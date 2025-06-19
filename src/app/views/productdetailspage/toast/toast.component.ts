import { Component, effect, inject, Injector } from '@angular/core';
import Toast from 'bootstrap/js/dist/toast.js';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  toast!: Toast;
  toastStatus = '';

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.toast$.subscribe((value) => {
      this.toastStatus = value;

      this.toast = Toast.getOrCreateInstance(
        document.getElementById('toast')!,
        {
          delay: 500,
        }
      );

      this.toast?.show();
    });
  }
}
