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
  toastStatus = {
    status: '',
    timestamp: 0,
  };
  private injector = inject(Injector);

  constructor(private toastService: ToastService) {}

  ngAfterViewInit() {
    effect(
      () => {
        this.toastStatus = this.toastService.toastStatus();

        if (this.toastStatus.status) {
          this.toast = Toast.getOrCreateInstance(
            document.getElementById('toast')!,
            {
              delay: 500,
            }
          );

          this.toast?.show();
        }
      },
      { injector: this.injector }
    );
  }
}
