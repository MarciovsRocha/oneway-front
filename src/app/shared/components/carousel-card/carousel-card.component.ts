import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwiperComponent, SwiperModule } from 'swiper/angular';
import SwiperCore, { Navigation, Pagination, Scrollbar, Virtual } from 'swiper';
import { CardComponent } from '../card/card.component';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

SwiperCore.use([Navigation, Pagination, Scrollbar, Virtual]);

@Component({
  selector: 'app-carousel-card',
  standalone: true,
  imports: [FontAwesomeModule, MatIcon, MatButtonModule, CardComponent, SwiperModule],
  templateUrl: './carousel-card.component.html',
  styleUrl: './carousel-card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CarouselCardComponent {
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
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

  slideNext() {
    this.swiper?.swiperRef.slideNext();
  }
  slidePrev() {
    this.swiper?.swiperRef.slidePrev();
  }
}
