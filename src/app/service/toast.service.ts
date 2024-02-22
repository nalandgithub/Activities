import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  success(message: string): void {
    this.toastr.success(message, "Success");
  }

  info(message: string): void {
    this.toastr.info(message, "Info");
  }

  warning(message: string): void {
    this.toastr.warning(message, "Warning");
  }

  error(message: string): void {
    this.toastr.error(message, "Error");
  }
}
