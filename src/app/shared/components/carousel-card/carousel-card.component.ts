import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SwiperModule } from 'swiper/angular';
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, Virtual } from 'swiper';

SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  Virtual
]);


@Component({
  selector: 'app-carousel-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, SwiperModule],
  templateUrl: './carousel-card.component.html',
  styleUrl: './carousel-card.component.scss',
  encapsulation: ViewEncapsulation.None   
})
export class CarouselCardComponent {
  products = [
    {
      name: 'Teste',
      price: 24,
      image: 'none',
      inventoryStatus: 'INSTOCK',
    },
    {
      name: 'Teste',
      price: 24,
      image: 'none',
      inventoryStatus: 'INSTOCK',
    },
    {
      name: 'Teste',
      price: 24,
      image: 'none',
      inventoryStatus: 'INSTOCK',
    },
 
  ] 

  onSlideChange() {
    console.log('slide change');
  }
}
