import { Component, ViewEncapsulation } from '@angular/core';
import { SwiperModule } from 'swiper/angular';
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, Virtual } from 'swiper';
import { CardComponent } from '../card/card.component';

SwiperCore.use([Navigation, Pagination, Scrollbar, Virtual]);

@Component({
  selector: 'app-carousel-card',
  standalone: true,
  imports: [SwiperModule, CardComponent],
  templateUrl: './carousel-card.component.html',
  styleUrl: './carousel-card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CarouselCardComponent {
  breakpoints = {
    0: { slidesPerView: 1 },
    576: { slidesPerView: 1, spaceBetween: 16 },
    768: { slidesPerView: 2, spaceBetween: 16 },
    1024: { slidesPerView: 4, spaceBetween: 10 },
  };

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
  ];

  onSlideChange() {
    console.log('slide change');
  }
}
