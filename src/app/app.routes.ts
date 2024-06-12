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
import { LocationListComponent } from './features/logged-in/location/location-list/location-list.component';
import { LocationRegistrationComponent } from './features/logged-in/location/location-registration/location-registration.component';

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
    path: 'location',
    children: [
      { path: '', component: LocationListComponent },
      { path: 'detail', component: LocationRegistrationComponent },
    ],
  },
  {
    path: 'package',
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
    path: 'travels',
    children: [
      { path: '', component: OrdersComponent },
      { path: 'detail', component: CartComponent, data: { isFromOrder: true} },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
