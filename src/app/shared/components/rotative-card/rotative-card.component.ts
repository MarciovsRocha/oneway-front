import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-rotative-card',
  standalone: true,
  imports: [CarouselModule, ButtonModule, TagModule],
  templateUrl: './rotative-card.component.html',
  styleUrl: './rotative-card.component.scss',
})
export class RotativeCardComponent {
  // https://primeng.org/carousel
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
    {
      name: 'Teste',
      price: 24,
      image: 'none',
      inventoryStatus: 'INSTOCK',
    },
  ];
  responsiveOptions: any[] | undefined;

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return '';
    }
  }
}
