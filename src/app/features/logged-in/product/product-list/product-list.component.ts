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
import { Product } from '../../../../shared/models/product';
import { Router } from '@angular/router';
import { ProductService } from '../../../../shared/services/product.service';

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
export class ProductListComponent implements OnInit{
  dataListToTable: any[] = []
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = [
    'nome',
    'tipo',
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

  data: Product[] = [];

  constructor(private router: Router, private productService: ProductService) {}


  ngOnInit() {
    this.data = this.productService.getAllMocked();
    this.dataSource = new MatTableDataSource(this.convertListToTable(this.data))
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(element: Product) {
    this.router.navigate([`product/detail`], {
      state: {
        data: this.data.find(product => product.id === element.id),
      },
    });
  }

  back() {
    this.router.navigate(['start']);
  }

  newProduct() {
    this.router.navigate([`product/detail`]);
  }

  convertListToTable(list: Product[]) {
    return list.map(product => ({
      id: product.id,
      nome: product.nome,
      tipo: product.idTipo,
      preco: 'R$ ' + product.precoMedioDiaria,
      pais: product.cidade.estado.pais.nome,
      estado: product.cidade.estado.nome,
      cidade: product.cidade.nome
    }));
  }
}
