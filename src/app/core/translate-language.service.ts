import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin } from 'rxjs';

export interface ILanguageOption {
  value: string;
  label: string;
}

@Injectable({
  providedIn: 'root',
})
export class TranslateLanguageService {
  languageOptions: ILanguageOption[] = [];
  private readonly availableLanguages = ['pt-br', 'en-us'];
  private readonly translateService = inject(TranslateService);

  start() {
    this.translateService.addLangs(this.availableLanguages);
    this.translateService.setDefaultLang('pt-br'); // again this name need to be the same as the JSON file name
    this.buildLanguageOptions();
  }

  private buildLanguageOptions() {
    const PORTUGUESE = this.translateService.get('pt-br');
    const ENGLISH =  this.translateService.get('en-us');


    forkJoin([
      PORTUGUESE,
      ENGLISH,
    ]).subscribe(
      _response => {
        this.languageOptions = [{
          value: this.availableLanguages[0],
          label: _response[0],
        }, {
          value: this.availableLanguages[1],
          label: _response[1],
        }];
      }
    );
  }

  changeLanguage(language: ILanguageOption) {
    this.translateService.use(language.value);
  }
}
