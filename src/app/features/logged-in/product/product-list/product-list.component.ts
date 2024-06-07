import { Component, OnInit, ViewChild, computed } from '@angular/core';
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
import { MatTabChangeEvent, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { ToastrService } from 'ngx-toastr';
import { ProductType } from '../../../../shared/enum/product-type.enum';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

interface ColumnDisplay {
  name: string;
  attribute: string;
}

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
    MatTabsModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  productTypeList: string[] = ProductType.getAllTypesTexts();
  dataListToTable: any[] = [];
  dataSource = new MatTableDataSource([]);
  displayedColumns: ColumnDisplay[] = [
    { name: 'Nome', attribute: 'nome'},
    { name: 'Tipo', attribute: 'tipo'},
    { name: 'Preço Médio Diária', attribute: 'preco'},
    { name: 'País', attribute: 'pais'},
    { name: 'Estado', attribute: 'estado'},
    { name: 'Cidade', attribute: 'cidade'},
    { name: 'Ação', attribute: 'acao'},
  ];
  columnsWithoutAction: ColumnDisplay[] = this.displayedColumns.slice(0, -1);
  columnsToDisplay: string[] = this.displayedColumns.slice().map(column => column.attribute);
  faTrashCan = faTrashCan;
  faPenToSquare = faPenToSquare;

  products: Product[] = [];

  constructor(
    private toastService: ToastrService,
    private router: Router,
    private productService: ProductService,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.getProdutos(1);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(element: Product) {
    this.router.navigate([`product/detail`], {
      state: {
        data: this.products.find((product) => product.id === element.id),
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
    return list.map((product) => ({
      id: product.id,
      nome: product.nome,
      tipo: ProductType.getTypeText(product.id_Tipo),
      preco: 'R$ ' + product.precoMedioDiaria.toLocaleString('pt-BR', { minimumFractionDigits: 2 }),
      pais: product.cidade.estado.pais.nome,
      estado: product.cidade.estado.nome,
      cidade: product.cidade.nome,
    }));
  }

  getProdutos(id: number) {
    this.productService.getAllByType(id).subscribe({
      next: (resultado: Product[]) => {
        this.products = resultado;
        this.dataSource = new MatTableDataSource(
          this.convertListToTable(this.products)
        );
      },
      error: (err: any) => {
        console.log('Erro', err);
        this.toastService.error('Erro inesperado! Tente novamente mais tarde');
        this.products = this.productService.getAllByTypeMocked(id);
        this.dataSource = new MatTableDataSource(
          this.convertListToTable(this.products)
        );
      },
    });
  }

  onTabChange(event: MatTabChangeEvent) {
    this.getProdutos(event.index+1);
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.delete(id).subscribe({
          next: (result: any) => {
            this.toastService.success('Operação realizada com sucesso!');
            this.getProdutos(this.tabGroup.selectedIndex+1)
          },
          error: (err: any) => {
            console.log('Erro', err);
            this.toastService.error('Erro inesperado! Tente novamente mais tarde');
          },
        });
      }
    });
  }
}
