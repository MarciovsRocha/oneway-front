import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  totalRequests = 0;
  disable = false

  constructor(private spinnerService: NgxSpinnerService) {}

  setLoading(loading: boolean) {
    if (!this.disable && loading && loading == true) this.spinnerService.show();
    else this.spinnerService.hide();
  }

  setDisable(disable: boolean) {
    this.disable = disable
  }
}
