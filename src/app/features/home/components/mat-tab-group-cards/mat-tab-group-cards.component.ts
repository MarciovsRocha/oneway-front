import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { CarouselCardComponent } from '../../../../shared/components/carousel-card/carousel-card.component';
import { Product } from '../../../../shared/models/product';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../../shared/services/product.service';
import { CartService } from '../../../../shared/services/cart.service';
import { ProductType } from '../../../../shared/enum/product-type.enum';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-mat-tab-group-cards',
  standalone: true,
  imports: [MatTabsModule, CarouselCardComponent, TranslateModule],
  templateUrl: './mat-tab-group-cards.component.html',
  styleUrl: './mat-tab-group-cards.component.scss',
})
export class MatTabGroupCardsComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  @Input() submittedData: { from: number, to: number } | null;
  @Input() fromAndToCity: any = { from: 0, to: 0 }
  productTypeList: string[] = ProductType.getAllTypesTexts()
  filtroImagem: string = this.productTypeList[0];
  produtos: Product[] = [];

  constructor(
    private produtoService: ProductService,
    private toastService: ToastrService,
    private cartService: CartService
  ) {}

    
  ngOnInit() {
    this.getProdutos(1, 0, 0);
  }

  ngOnChanges(): void {
    if (this.submittedData && this.submittedData?.from >= 0 && this.submittedData?.to >= 0) {
      this.fromAndToCity = this.submittedData
      this.getProdutos(this.productTypeSelected, this.fromAndToCity['from'], this.fromAndToCity['to'])
    }
  }

  onTabChange(event: MatTabChangeEvent) {
    const activeTabLabel = event.tab.textLabel;
    this.filtroImagem = activeTabLabel;
    this.getProdutos(event.index+1, this.fromAndToCity['from'], this.fromAndToCity['to']);
  }


  getProdutos(type: number, cityFrom: number, cityTo: number) {
    this.produtoService.getByTypeAndCities(type, cityFrom, cityTo).subscribe({
      next: (resultado: Product[]) => {
        this.produtos = resultado;
      },
      error: (err: any) => {
        console.log('Erro', err);
        this.toastService.error('Erro inesperado! Tente novamente mais tarde');
        this.produtos = this.produtoService.getAllByTypeMocked(type);
      },
    });
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }

  get productTypeSelected(): number {
    return this.tabGroup?.selectedIndex + 1 || 1;
  }
}
