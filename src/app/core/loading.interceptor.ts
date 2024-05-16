import { HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from './loader.service';
import { finalize } from 'rxjs';
import { inject } from '@angular/core';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  let loaderService = inject(LoaderService);
  loaderService.totalRequests++;
  loaderService.setLoading(true);

  return next(req).pipe(
    finalize(() => {
      loaderService.totalRequests--;
      if (loaderService.totalRequests == 0) {
        loaderService.setLoading(false);
      }
    })
  );
};
