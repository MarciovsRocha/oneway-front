import { HeaderComponent } from '../../shared/components/header/header.component';
import { CarouselCardComponent } from '../../shared/components/carousel-card/carousel-card.component';
import { Component } from '@angular/core';
import { SearchComponent } from '../../shared/components/search/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [HeaderComponent, SearchComponent, CarouselCardComponent],
})
export class HomeComponent {}
