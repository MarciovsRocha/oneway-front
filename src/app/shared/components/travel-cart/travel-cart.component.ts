import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { CartService } from '../../services/cart.service';
import { Hotel } from '../../models/Hotel';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-travel-cart',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    FontAwesomeModule,
    MatBottomSheetModule,
    MatBadgeModule,
    MatCardModule
  ],
  templateUrl: './travel-cart.component.html',
  styleUrl: './travel-cart.component.scss',
})
export class TravelCartComponent {
  cart: Hotel[] = [];
  private cartSubscription: Subscription;
  faBoxOpen = faBoxOpen;


  constructor(private cartService: CartService,
    private _bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this._bottomSheet.open(InsideTravelCart);
  }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }

  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}

@Component({
  selector: 'inside-travel-cart',
  templateUrl: './inside-travel-cart/inside-travel-cart.html',
  styleUrl: './travel-cart.component.scss',
  standalone: true,
  imports: [MatButtonModule, MatListModule, MatCardModule, MatIconModule, MatRippleModule],
})
export class InsideTravelCart implements OnInit {
  cart: Hotel[]
  cartSubscription: Subscription;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<TravelCartComponent>,
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
    });
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  openFullCart() {
    this._bottomSheetRef.dismiss()
    this.router.navigate(['cart']);
  }
}
