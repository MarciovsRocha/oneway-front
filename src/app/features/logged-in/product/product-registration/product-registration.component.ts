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
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-product-registration',
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
  templateUrl: './product-registration.component.html',
  styleUrl: './product-registration.component.scss',
})
export class ProductRegistrationComponent implements OnInit {
  productForm!: FormGroup<any>;
  product: Product;
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
    private translatePipe: TranslatePipe,
  ) {
    this.product = this.router.getCurrentNavigation()?.extras.state?.['data'];
    this.type = this.router.getCurrentNavigation()?.extras.state?.['type'];
    this.productForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      tipo: new FormControl({value: this.translatePipe.transform(ProductType.getTypeText(this.type)) , disabled: true}, [Validators.required]),
      preco: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      pais: new FormControl([], [Validators.required]),
      cidade: new FormControl([], [Validators.required]),
      estado: new FormControl([], [Validators.required]),
      files: new FormControl([]),
    });
  }

  ngOnInit() {
    this.getCountryList();
    this.getStateList();
    this.getCityList();
    this.isEditProduct = this.product && this.product.id > 0
    this.textAppendTitle = this.isEditProduct ? 'EDITAR' : 'CADASTRAR';
    if (this.product) this.loadDataForm(this.product);
  }

  loadDataForm(product: Product) {
    this.productForm.get('nome').setValue(product.nome);
    this.productForm.get('tipo').setValue(this.translatePipe.transform(ProductType.getTypeText(product.id_Tipo)));
    this.productForm.get('preco').setValue(product.precoMedioDiaria);
    this.productForm.get('descricao').setValue(product.descricao);
    this.productForm.get('pais').setValue(product.cidade.estado.pais.id);
    this.productForm.get('estado').setValue(product.cidade.estado.id);
    this.productForm.get('cidade').setValue(product.cidade.id);
  }

  handleFileInputChange(event: any): void {
    const files: File[] = event.target.files;
    this.file_store = files;
    if (files.length) {
      const f = files[0];
      const count = files.length > 1 ? `(+${files.length - 1} arquivo(s))` : '';
      this.displayInput.patchValue(`${f.name}${count}`);
    } else {
      this.displayInput.patchValue('');
    }
  }

  handleSubmit(): void {
    let file_list = [];
    this.productForm.controls['files'].setValue([]);
    for (let i = 0; i < this.file_store.length; i++) {
      file_list.push(this.file_store[i].name);
    }
    this.productForm.controls['files'].setValue(file_list);
  }

  submit() {
    if (this.productForm.valid) {
      this.productService[this.isEditProduct ? 'update' : 'save'](this.getProductFromForm()).subscribe({
        next: () => {
          this.toastService.success(this.translatePipe.transform("OPERACAO.REALIZADA.SUCESSO"));
          this.router.navigate(['product']);
        },
        error: (error) => {
          this.toastService.error(this.translatePipe.transform("ERRO.INESPERADO.TENTE.NOVAMENTE"));
        },
      });
    }
  }

  getProductFromForm(): Product {
    const product: Product = new Product();
    product.id = this.isEditProduct ? this.product.id : 0;
    product.nome = this.productForm.get('nome').value;
    product.id_Tipo = ProductType.getTypeNumber(this.productForm.get('tipo').value);
    product.precoMedioDiaria = this.productForm.get('preco').value;
    product.descricao = this.productForm.get('descricao').value;
    product.id_Cidade = this.productForm.get('cidade').value;
    return product;
  }

  back() {
    this.router.navigate(['product']);
  }

  getCountryList() {
    this.countryService.getAll().subscribe({
      next: (result: Country[]) => {
        this.countryList = result;
      },
      error: (err: any) => {
        console.log('Erro', err);
        this.toastService.error(this.translatePipe.transform("ERRO.INESPERADO.TENTE.NOVAMENTE"));
      },
    });
  }

  getStateList() {
    this.stateService.getAll().subscribe({
      next: (result: State[]) => {
        this.stateList = result;
      },
      error: (err: any) => {
        console.log('Erro', err);
        this.toastService.error(this.translatePipe.transform("ERRO.INESPERADO.TENTE.NOVAMENTE"));
      },
    });
  }

  getCityList() {
    this.cityService.getAll().subscribe({
      next: (result: City[]) => {
        this.cityList = result;
      },
      error: (err: any) => {
        console.log('Erro', err);
        this.toastService.error(this.translatePipe.transform("ERRO.INESPERADO.TENTE.NOVAMENTE"));
      },
    });
  }

  get stateListByCountry(): State[] {
    if (this.productForm && this.countryList && this.stateList) {
      let selectedCountryId = this.productForm.get('pais').value;
      return (
        this.stateList.filter((state) => state.id_Pais == selectedCountryId) ||
        []
      );
    }
    return [];
  }

  get cityListByState(): State[] {
    if (this.productForm && this.stateList && this.cityList) {
      let selectedStateId = this.productForm.get('estado').value;
      return (
        this.cityList.filter((city) => city.id_Estado == selectedStateId) || []
      );
    }
    return [];
  }
}
