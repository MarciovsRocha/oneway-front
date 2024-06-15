import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CartService } from '../../../shared/services/cart.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Product } from '../../../shared/models/product';
import { ProductType } from '../../../shared/enum/product-type.enum';
import { Order } from '../../../shared/models/order';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/auth.service';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    HeaderComponent,
    MatCardModule,
    MatButtonModule,
    MatIcon,
    MatRippleModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    FontAwesomeModule,
    MatDialogModule,
    TranslateModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  ProductType = ProductType;
  products: Product[] = [];
  order: Order;
  cartSubscription: Subscription;

  faTrashCan = faTrashCan;
  faAngleLeft = faAngleLeft;
  isFromOrder: boolean = false;
  title: string = 'MONTE.SEU.PACOTE';
  name = new FormControl('');

  constructor(
    private cartService: CartService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastrService,
    private authService: AuthService,
    private translatePipe: TranslatePipe
  ) {
    this.order = this.router.getCurrentNavigation()?.extras.state?.['data'];
  }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.isFromOrder = data['isFromOrder'];
    });

    if (this.isFromOrder) {
      this.title = `Viagem #${this.order?.numero} ${this.order?.name ? ' - ' + this.order.name : '' }`;
      this.products = this.order?.produtos || [];
      this.name.disable();
      this.name.setValue(this.order?.name || '');
    } else {
      this.cartSubscription = this.cartService.cart$.subscribe((cart) => {
        this.products = cart;
      });
    }
  }

  removeFromCart(productId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cartService.removeFromCart(productId);
      }
    });
  }

  back() {
    if (this.isFromOrder) {
      this.router.navigate(['travels']);
    } else {
      this.router.navigate(['']);
    }
  }

  finish() {
    if (this.authService.isAutenticated()) {
      if (!this.isFromOrder) {
        let orders: Order[] = JSON.parse(localStorage.getItem('orders')) || [];
        let newOrder = new Order();
        newOrder.produtos = this.products;
        newOrder.dataCompra = new Date();
        newOrder.total = this.getTotal(this.products);
        newOrder.name = this.name.value;
        orders.push(newOrder);
        localStorage.setItem('orders', JSON.stringify(orders));
        this.toastService.success(this.translatePipe.transform("OPERACAO.REALIZADA.SUCESSO"));
        this.cartService.cleanCart();
        this.router.navigate(['']);
      }
    } else {
      this.toastService.warning(this.translatePipe.transform("VOCE.PRECISA.AUTENTICAR.OPERACAO"))
    }
  }

  getTotal(products: Product[]): number {
    if (products && products.length > 0) {
      let total = 0;
      products.forEach((product) => {
        total += product.precoMedioDiaria;
      });
      return total;
    }
    return 0;
  }
}
