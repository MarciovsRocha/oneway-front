import { HeaderComponent } from '../../shared/components/header/header.component';
import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { SearchComponent } from '../../shared/components/search/search.component';
import { MatTabGroupCardsComponent } from './components/mat-tab-group-cards/mat-tab-group-cards.component';
import { TravelCartComponent } from '../../shared/components/travel-cart/travel-cart.component';
import { TranslateModule } from '@ngx-translate/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SafePipe } from "../../pipes/sanitize-html.pipe";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        HeaderComponent,
        TravelCartComponent,
        SearchComponent,
        MatTabGroupCardsComponent,
        TranslateModule,
        SafePipe
    ],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  styledContent: SafeHtml;
  submittedData: any = null

  constructor(private sanitizer: DomSanitizer){}

  receiveSubmitData(data: any): void {
    this.submittedData = data;
  }
}
