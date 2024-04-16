import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CarouselCardComponent } from '../../../../shared/components/carousel-card/carousel-card.component';


@Component({
  selector: 'app-mat-tab-group-cards',
  standalone: true,
  imports: [MatTabsModule, CarouselCardComponent],
  templateUrl: './mat-tab-group-cards.component.html',
  styleUrl: './mat-tab-group-cards.component.scss',
})
export class MatTabGroupCardsComponent {}
