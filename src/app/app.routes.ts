import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SignupComponent } from './features/public/signup/signup.component';
import { LoginComponent } from './features/public/login/login.component';
import { StartComponent } from './features/logged-in/start/start.component';
import { ProductListComponent } from './features/logged-in/product/product-list/product-list.component';
import { ProductRegistrationComponent } from './features/logged-in/product/product-registration/product-registration.component';
import { CartComponent } from './features/public/cart/cart.component';
import { HomeAdmComponent } from './features/logged-in/home-adm/home-adm.component';
import { TypeUserComponent } from './features/logged-in/type-user/type-user.component';
import { OrdersComponent } from './features/logged-in/orders/orders.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'start',
    component: StartComponent,
  },
  {
    path: 'product',
    children: [
      { path: '', component: ProductListComponent },
      { path: 'detail', component: ProductRegistrationComponent },
    ],
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'type-user',
    component: TypeUserComponent,
  },
  {
    path: 'home-adm',
    component: HomeAdmComponent,
  },
  {
    path: 'orders',
    children: [
      { path: '', component: OrdersComponent },
      { path: 'detail', component: CartComponent, data: { isFromOrder: true} },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
