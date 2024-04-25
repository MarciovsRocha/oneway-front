import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { CarouselCardComponent } from '../../../../shared/components/carousel-card/carousel-card.component';
import { Produto } from '../../../../models/produto';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from '../../../../services/produto.service';


@Component({
  selector: 'app-mat-tab-group-cards',
  standalone: true,
  imports: [MatTabsModule, CarouselCardComponent],
  templateUrl: './mat-tab-group-cards.component.html',
  styleUrl: './mat-tab-group-cards.component.scss',
})
export class MatTabGroupCardsComponent implements OnInit {
  listaCategorias: string[] = ['Hospedagem', 'Transporte', 'Pontos Turísticos']
  filtroImagem: string = this.listaCategorias[0];
  produtos: Produto[] = [];

  constructor(
    private produtoService: ProdutoService,
    private toastService: ToastrService
  ) {}

    
  ngOnInit() {
    this.getProdutos();
  }

  onTabChange(event: MatTabChangeEvent) {
    const activeTabLabel = event.tab.textLabel;
    this.filtroImagem = activeTabLabel;
    this.getProdutos();
  }


  getProdutos() {
    this.produtoService.produto().subscribe({
      next: (resultado: Produto[]) => {
        this.produtos = resultado;
      },
      error: (err: any) => {
        console.log('Erro', err);
        this.toastService.error('Erro inesperado! Tente novamente mais tarde');
      },
    });
  }
}
