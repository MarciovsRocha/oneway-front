import { Component, OnInit, computed } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { DefaultListLayoutComponent } from '../../../../shared/components/default-list-layout/default-list-layout.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Produto } from '../../../../shared/models/produto';
import { Router } from '@angular/router';
import { ProdutoService } from '../../../../shared/services/produto.service';

const ELEMENT_DATA: Produto[] = [
  {
    id: 1,
    titulo: 'Teste1',
    categoria: 'Hospedagem',
    preco: 150.2,
    descricao: 'teste teste teste',
    pais: 'Brasil',
    estado: 'Paraná',
    cidade: 'Curitiba',
  },
  {
    id: 2,
    titulo: 'Teste2',
    categoria: 'Hospedagem',
    preco: 150.2,
    descricao: 'teste teste teste',
    pais: 'Brasil',
    estado: 'Paraná',
    cidade: 'Curitiba',
  },
  {
    id: 3,
    titulo: 'Teste3',
    categoria: 'Hospedagem',
    preco: 150.2,
    descricao: 'teste teste teste',
    pais: 'Brasil',
    estado: 'Paraná',
    cidade: 'Curitiba',
  },
  {
    id: 4,
    titulo: 'Teste4',
    categoria: 'Hospedagem',
    preco: 150.2,
    descricao: 'teste teste teste',
    pais: 'Brasil',
    estado: 'Paraná',
    cidade: 'Curitiba',
  },
  {
    id: 5,
    titulo: 'Teste5',
    categoria: 'Hospedagem',
    preco: 150.2,
    descricao: 'teste teste teste',
    pais: 'Brasil',
    estado: 'Paraná',
    cidade: 'Curitiba',
  },
  {
    id: 6,
    titulo: 'Teste6',
    categoria: 'Hospedagem',
    preco: 150.2,
    descricao: 'teste teste teste',
    pais: 'Brasil',
    estado: 'Paraná',
    cidade: 'Curitiba',
  },
];

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    HeaderComponent,
    FontAwesomeModule,
    DefaultListLayoutComponent,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  displayedColumns: string[] = [
    'titulo',
    'categoria',
    'preco',
    'pais',
    'estado',
    'cidade',
    'acao',
  ];
  columnsWithoutAction: string[] = this.displayedColumns.slice(0, -1);
  columnsToDisplay: string[] = this.displayedColumns.slice();
  faTrashCan = faTrashCan;
  faPenToSquare = faPenToSquare;

  data: Produto[] = ELEMENT_DATA;

  constructor(private router: Router, private produto: ProdutoService) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(element: Produto) {
    this.router.navigate([`product/detail`], {
      state: {
        data: element,
      },
    });
  }

  back() {
    this.router.navigate(['start']);
  }

  newProduct(){
    this.router.navigate([`product/detail`]);
  }
}
