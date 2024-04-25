import { HeaderComponent } from '../../shared/components/header/header.component';
import { Component } from '@angular/core';
import { SearchComponent } from '../../shared/components/search/search.component';
import { MatTabGroupCardsComponent } from './components/mat-tab-group-cards/mat-tab-group-cards.component';
import { TravelCartComponent } from '../../shared/components/travel-cart/travel-cart.component';

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
  ],
})
export class HomeComponent {}
