import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { CarouselCardComponent } from '../../../../shared/components/carousel-card/carousel-card.component';
import { Product } from '../../../../shared/models/product';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../../shared/services/product.service';
import { CartService } from '../../../../shared/services/cart.service';
import { ProductType } from '../../../../shared/enum/product-type.enum';


@Component({
  selector: 'app-mat-tab-group-cards',
  standalone: true,
  imports: [MatTabsModule, CarouselCardComponent],
  templateUrl: './mat-tab-group-cards.component.html',
  styleUrl: './mat-tab-group-cards.component.scss',
})
export class MatTabGroupCardsComponent implements OnInit {
  productTypeList: string[] = ProductType.getAllTypesTexts()
  filtroImagem: string = this.productTypeList[0];
  produtos: Product[] = [];

  constructor(
    private produtoService: ProductService,
    private toastService: ToastrService,
    private cartService: CartService
  ) {}

    
  ngOnInit() {
    this.getProdutos(1);
  }

  onTabChange(event: MatTabChangeEvent) {
    const activeTabLabel = event.tab.textLabel;
    this.filtroImagem = activeTabLabel;
    this.getProdutos(event.index+1);
  }


  getProdutos(id: number) {
    this.produtoService.getAllByType(id).subscribe({
      next: (resultado: Product[]) => {
        this.produtos = resultado;
      },
      error: (err: any) => {
        console.log('Erro', err);
        this.toastService.error('Erro inesperado! Tente novamente mais tarde');
        this.produtos = this.produtoService.getAllByTypeMocked(id);
      },
    });
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }
}
