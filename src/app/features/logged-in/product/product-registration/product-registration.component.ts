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
  ],
  templateUrl: './product-registration.component.html',
  styleUrl: './product-registration.component.scss',
})
export class ProductRegistrationComponent implements OnInit {
  @Input() id!: number;
  productForm!: FormGroup<any>;

  product: Product;

  listaCategorias: string[] = ['Hospedagem', 'Transporte', 'Pontos Turísticos'];
  paises: string[] = [];
  cidades: string[] = [];
  estados: string[] = [];

  displayInput: FormControl = new FormControl('');
  file_store: File[] = [];
  textAppendTitle: string = '';

  constructor(
    private router: Router,
    private toastService: ToastrService,
    private produto: ProductService,
    private route: ActivatedRoute
  ) {
    this.product = this.router.getCurrentNavigation()?.extras.state?.['data'];
    this.textAppendTitle = this.id && this.id > 0 ? 'Editar' : 'Cadastrar';
    this.productForm = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      tipo: new FormControl('', [Validators.required]),
      preco: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required]),
      pais: new FormControl([], [Validators.required]),
      cidade: new FormControl([], [Validators.required]),
      estado: new FormControl([], [Validators.required]),
      files: new FormControl([]),
    });
  }

  ngOnInit() {
    this.textAppendTitle = this.id && this.id > 0 ? 'Editar' : 'Cadastrar';
    if (this.product) this.loadDataForm(this.product);
  }

  loadDataForm(product: Product) {
    console.log('product', product);
    this.productForm.get('nome').setValue(product.nome);
    this.productForm.get('tipo').setValue(product.idTipo);
    this.productForm.get('preco').setValue(product.precoMedioDiaria);
    this.productForm.get('descricao').setValue(product.descricao);
    this.productForm.get('pais').setValue(product.cidade.estado.pais.nome);
    this.productForm.get('estado').setValue(product.cidade.estado.nome);
    this.productForm.get('cidade').setValue(product.cidade.nome);
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
    const product: Product = this.productForm.value;
    this.produto.saveOrUpdate(product).subscribe({
      next: () => {
        this.toastService.success('Realizado com Sucesso');
        this.router.navigate(['start']);
      },
      error: (error) => {
        let errorMessage = 'Erro ao inesperado';
        this.toastService.error(errorMessage);
      },
    });
  }

  back() {
    this.router.navigate(['product']);
  }
}
