import { Component, Input, OnInit } from '@angular/core';
import { DefaultRegistrationLayoutComponent } from '../../../../shared/components/default-registration-layout/default-registration-layout.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../../shared/services/product.service';
import { Product } from '../../../../shared/models/product';
import { ProductType } from '../../../../shared/enum/product-type.enum';
import { Country } from '../../../../shared/models/country';
import { City } from '../../../../shared/models/city';
import { State } from '../../../../shared/models/state';
import { CountryService } from '../../../../shared/services/country.service';
import { StateService } from '../../../../shared/services/state.service';
import { CityService } from '../../../../shared/services/city.service';
import { forkJoin } from 'rxjs';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-location-registration',
  standalone: true,
  imports: [
    HeaderComponent,
    DefaultRegistrationLayoutComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    CurrencyMaskModule,
    TranslateModule
  ],
  templateUrl: './location-registration.component.html',
  styleUrl: './location-registration.component.scss',
})
export class LocationRegistrationComponent implements OnInit {
  locationForm!: FormGroup<any>;
  product: any;
  type: number;

  productTypeList: string[] = ProductType.getAllTypesTexts();
  countryList: Country[] = [];
  cityList: City[] = [];
  stateList: State[] = [];

  displayInput: FormControl = new FormControl('');
  file_store: File[] = [];
  textAppendTitle: string = '';
  isEditProduct: boolean = true;

  constructor(
    private router: Router,
    private toastService: ToastrService,
    private productService: ProductService,
    private countryService: CountryService,
    private stateService: StateService,
    private cityService: CityService,
    private route: ActivatedRoute,
    private translatePipe: TranslatePipe
  ) {
    this.product = this.router.getCurrentNavigation()?.extras.state?.['data'];
    this.type = this.router.getCurrentNavigation()?.extras.state?.['type'];
    this.locationForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      pais: new FormControl(''),
      estado: new FormControl(''),
    });
  }

  ngOnInit() {
    this.getLocations();
    this.isEditProduct = this.product && this.product.id > 0;
    this.textAppendTitle = this.isEditProduct ? 'EDITAR' : 'CADASTRAR';
  }

  loadDataForm(product: any) {
    this.locationForm.get('nome').setValue(product.nome);
    switch (this.type) {
      case 2:
        this.locationForm.get('pais').setValidators(Validators.required);
        if (this.isEditProduct) {
          let state: State = this.stateList.find(
            (state) => (state.id == this.product.id)
          );
          this.locationForm.get('pais').setValue(state.id_Pais);
        }
        break;
      case 3:
        this.locationForm.get('pais').setValidators([Validators.required]);
        this.locationForm.get('estado').setValidators([Validators.required]);
        if (this.isEditProduct) {
          let city: City = this.cityList.find(
            (city) => (city.id == this.product.id)
          );
          let state: State = this.stateList.find(
            (state) => (state.id == city.id_Estado)
          );
          this.locationForm.get('estado').setValue(city.id_Estado);
          this.locationForm.get('pais').setValue(state.id_Pais);
        }
        break;
    }
  }

  submit() {
    if (this.locationForm.valid) {
      let res: any;
      switch (this.type) {
        case 1:
          res = this.countryService;
          break;
        case 2:
          res = this.stateService;
          break;
        case 3:
          res = this.cityService;
          break;
      }
      res[this.isEditProduct ? 'update' : 'save'](
        this.getLocationFromForm()
      ).subscribe({
        next: () => {
          this.toastService.success(this.translatePipe.transform("OPERACAO.REALIZADA.SUCESSO"));
          this.router.navigate(['location']);
        },
        error: () => {
          let errorMessage = 'Erro ao inesperado';
          this.toastService.error(errorMessage);
        },
      });
    }
  }

  getLocationFromForm(): any {
    switch (this.type) {
      case 1:
        let country: Country = new Country();
        country.id = this.isEditProduct ? this.product.id : null;
        country.nome = this.locationForm.get('nome').value;
        country.estados = [];
        return country;
      case 2:
        const state: State = new State();
        state.id = this.isEditProduct ? this.product.id : null;
        state.nome = this.locationForm.get('nome').value;
        state.cidades = [];
        let countrySelected: Country = this.countryList.find(
          (country) => country.id == this.locationForm.get('pais').value
        );
        countrySelected.estados = [];
        state.id_Pais = countrySelected.id;
        state.pais = countrySelected;
        return state;
      case 3:
        const city: City = new City();
        city.id = this.isEditProduct ? this.product.id : null;
        city.nome = this.locationForm.get('nome').value;
        city.produtos = [];
        let stateSelected: State = this.stateList.find(
          (state) => state.id == this.locationForm.get('estado').value
        );
        stateSelected.cidades = [];
        let countryFounded: Country = this.countryList.find(
          (country) => country.id == this.locationForm.get('pais').value
        );
        countryFounded.estados = []
        city.id_Estado = stateSelected.id;
        city.estado = stateSelected;
        city.estado.pais = countryFounded;
        return city;
    }
  }

  back() {
    this.router.navigate(['location']);
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
        if (this.product) this.loadDataForm(this.product);
      },
      error: (err) => {
        console.log('Erro', err);
        this.toastService.error(
          this.translatePipe.transform("ERRO.INESPERADO.TENTE.NOVAMENTE")
        );
      },
    });
  }

  get stateListByCountry(): State[] {
    if (this.locationForm && this.countryList && this.stateList) {
      let selectedCountryId = this.locationForm.get('pais').value;
      return (
        this.stateList.filter((state) => state.id_Pais == selectedCountryId) ||
        []
      );
    }
    return [];
  }

  get cityListByState(): State[] {
    if (this.locationForm && this.stateList && this.cityList) {
      let selectedStateId = this.locationForm.get('estado').value;
      return (
        this.cityList.filter((city) => city.id_Estado == selectedStateId) || []
      );
    }
    return [];
  }
}
