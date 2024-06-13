import { Component, ElementRef, OnInit, ViewChild, computed } from '@angular/core';
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
import {
  MatTabChangeEvent,
  MatTabGroup,
  MatTabsModule,
} from '@angular/material/tabs';
import { ToastrService } from 'ngx-toastr';
import { ProductType } from '../../../../shared/enum/product-type.enum';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { City } from '../../../../shared/models/city';
import { Country } from '../../../../shared/models/country';
import { State } from '../../../../shared/models/state';
import { CityService } from '../../../../shared/services/city.service';
import { CountryService } from '../../../../shared/services/country.service';
import { StateService } from '../../../../shared/services/state.service';
import { LoaderService } from '../../../../core/loader.service';
import { forkJoin } from 'rxjs';

interface ColumnDisplay {
  name: string;
  attribute: string;
}

@Component({
  selector: 'app-location-list',
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
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.scss',
})
export class LocationListComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  @ViewChild('inputSearch') inputSearch!: ElementRef;

  locationTypeList: string[] = ['País', 'Estado', 'Cidade'];
  dataListToTable: any[] = [];
  dataSource = new MatTableDataSource([]);
  faTrashCan = faTrashCan;
  faPenToSquare = faPenToSquare;

  products: Product[] = [];
  countryList: Country[] = [];
  cityList: City[] = [];
  stateList: State[] = [];

  displayedColumns: ColumnDisplay[] = [];
  columnsWithoutAction: ColumnDisplay[] = []
  columnsToDisplay: string[] = [];

  constructor(
    private toastService: ToastrService,
    private router: Router,
    public dialog: MatDialog,
    private countryService: CountryService,
    private stateService: StateService,
    private cityService: CityService,
    private loaderService: LoaderService,
  ) {}

  ngOnInit() {
    this.getLocations()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(element: any) {
    let result;
    switch (this.locationTypeSelected) {
      case 1:
        result = this.countryList.find(country => country.id == element.id)
        break;
      case 2:
        result = this.stateList.find(state => state.id == element.id)
        break;
      case 3:
        result = this.cityList.find(city => city.id == element.id)
        break;
    }
    console.log("this.locationTypeSelected", this.locationTypeSelected)
    this.router.navigate([`location/detail`], {
      state: {
        data: result,
        type: this.locationTypeSelected,
      },
    });
  }

  back() {
    this.router.navigate(['start']);
  }

  newProduct() {
    this.router.navigate([`location/detail`], {
      state: {
        type: this.locationTypeSelected,
      },
    });
  }

  convertListToTable() {
    this.loaderService.setLoading(true)
    this.updateColums()
    let result: any[] = [];
    switch (this.locationTypeSelected) {
      case 1:
        result = this.countryList.map((country): any => ({
          id: country.id,
          pais: country.nome,
        }));
        break;
      case 2:
        result = this.stateList.map((state): any => ({
          id: state.id,
          estado: state.nome,
          pais: this.countryList.find((country) => country.id == state.id_Pais).nome,
        }));
        break;
      case 3:
        result = this.cityList.map((city): any => {
          let state: State = this.stateList.find(
            (state) => state.id == city.id_Estado
          );
          return {
            id: city.id,
            pais: this.countryList.find(
              (country) => state.id_Pais == country.id
            ).nome,
            estado: state.nome,
            cidade: city.nome,
          };
        });
        break;
    }
    this.dataSource = new MatTableDataSource(result);
    this.loaderService.setLoading(false)
  }

  onTabChange(event: MatTabChangeEvent) {
    this.convertListToTable();
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cityService.delete(id).subscribe({
          next: (result: any) => {
            this.toastService.success('Operação realizada com sucesso!');
            this.getLocations()
          },
          error: (err: any) => {
            console.log('Erro', err);
            this.toastService.error(
              'Erro inesperado! Tente novamente mais tarde'
            );
          },
        });
      }
    });
  }

  getDisplayedColumns(): ColumnDisplay[] {
    let result: ColumnDisplay[] = [];
    switch (this.locationTypeSelected) {
      case 1:
        result = [{ name: 'Nome', attribute: 'pais' }];
        break;
      case 2:
        result = [
          { name: 'Nome', attribute: 'estado' },
          { name: 'País', attribute: 'pais' },
        ];
        break;
      case 3:
        result = [
          { name: 'Nome', attribute: 'cidade' },
          { name: 'País', attribute: 'pais' },
          { name: 'Estado', attribute: 'estado' },
        ];
        break;
    }
    if (result.length > 0) result.push({ name: 'Ação', attribute: 'acao' });
    return result;
  }

  updateColums() {
    this.inputSearch.nativeElement.value = ""
    this.displayedColumns = this.getDisplayedColumns()
    this.columnsWithoutAction = this.displayedColumns.slice(0, -1) || []
    this.columnsToDisplay = this.displayedColumns.slice().map((column) => column.attribute) || []
  }

  get locationTypeSelected(): number {
    return this.tabGroup?.selectedIndex + 1 || 1;
  }

  getLocations() {
    forkJoin([
      this.countryService.getAll(),
      this.stateService.getAll(),
      this.cityService.getAll(),
    ]).subscribe({
      next: ([countryList, stateList, cityList]) => {
        this.countryList = countryList;
        this.stateList = stateList;
        this.cityList = cityList;
        this.convertListToTable();
      },
      error: (err) => {
        console.log('Erro', err);
        this.toastService.error(
          'Erro inesperado! Não foi possível consultar os dados'
        );
      },
    });
  }
}
