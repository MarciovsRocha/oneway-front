import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
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
import { Router } from '@angular/router';
import { Product } from '../../../shared/models/product';

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
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cart: Product[];
  cartSubscription: Subscription;

  faTrashCan = faTrashCan;
  faAngleLeft = faAngleLeft;

  constructor(
    private cartService: CartService,
    public dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.cart$.subscribe((cart) => {
      this.cart = cart;
    });
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
    this.router.navigate(['']);
  }
}
