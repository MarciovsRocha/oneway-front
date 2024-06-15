import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../models/product';
import { TranslatePipe } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private products: Product[]

  private cartKey = 'shoppingCart';
  private cart: Product[] = this.getCartFromStorage();

  private cartSubject = new BehaviorSubject<Product[]>(this.cart);
  cart$ = this.cartSubject.asObservable();
  toastService = inject(ToastrService);

  constructor(private translatePipe: TranslatePipe){}

  getProducts(): Product[] {
    return this.products;
  }

  getCartFromStorage(): Product[] {
    const cart = localStorage.getItem(this.cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  addToCart(product: Product): void {
    const item = this.cart.find(p => p.id === product.id);
    if (!item) {
      this.cart.push(product);
      localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
      this.cartSubject.next(this.cart); 
      this.toastService.success(this.translatePipe.transform("OPERACAO.REALIZADA.SUCESSO"));
    }
  }

  removeFromCart(productId: number): void {
    const index = this.cart.findIndex(p => p.id === productId);
    if (index !== -1) {
      this.cart.splice(index, 1);
      localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
      this.cartSubject.next(this.cart);
      this.toastService.warning(this.translatePipe.transform("REMOVIDO.CARRINHO"));
    }
  }

  getCart(): Product[] {
    return this.cart;
  }

  cleanCart(): void {
    localStorage.setItem(this.cartKey, JSON.stringify([]));
    this.cartSubject.next([]);
  }
  
}
