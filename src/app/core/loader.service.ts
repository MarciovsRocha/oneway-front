import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  totalRequests = 0;

  constructor(private spinnerService: NgxSpinnerService) {}

  setLoading(loading: boolean) {
    if (loading && loading == true) this.spinnerService.show();
    else this.spinnerService.hide();
  }
}
