import { Injectable, inject } from '@angular/core';
import { Hotel } from '../models/Hotel';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private products: Hotel[]

  private cartKey = 'shoppingCart';
  private cart: Hotel[] = this.getCartFromStorage();

  private cartSubject = new BehaviorSubject<Hotel[]>(this.cart);
  cart$ = this.cartSubject.asObservable();
  toastService = inject(ToastrService);

  getProducts(): Hotel[] {
    return this.products;
  }

  getCartFromStorage(): Hotel[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  addToCart(product: Hotel): void {
    const item = this.cart.find(p => p.id === product.id);
    if (!item) {
      this.cart.push(product);
      localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
      this.cartSubject.next(this.cart); 
      this.toastService.success('Adicionado no carrinho!');
    }
  }

  removeFromCart(productId: number): void {
    const index = this.cart.findIndex(p => p.id === productId);
    if (index !== -1) {
      this.cart.splice(index, 1);
      localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
      this.cartSubject.next(this.cart);
      this.toastService.warning('Removido do carrinho!');
    }
  }

  getCart(): Hotel[] {
    return this.cart;
  }
}
