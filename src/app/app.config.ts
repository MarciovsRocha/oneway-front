import {
  ApplicationConfig,
  LOCALE_ID,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { loadingInterceptor } from './core/loading.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SafePipe } from './pipes/sanitize-html.pipe';

registerLocaleData(localePt);

function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const I18N_CONFIG = {
  defaultLanguage: 'pt-br', // this name need to be the same as the JSON file
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideAnimationsAsync(),
    provideToastr(),
    provideHttpClient(withInterceptors([loadingInterceptor])),
    importProvidersFrom(NgxSpinnerModule.forRoot({ type: 'ball-fussion' })),
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    importProvidersFrom(TranslateModule.forRoot(I18N_CONFIG)),
    TranslatePipe,
  ],
};
