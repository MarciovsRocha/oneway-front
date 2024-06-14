import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { StartComponent } from './features/logged-in/start/start.component';
import { ProductListComponent } from './features/logged-in/product/product-list/product-list.component';
import { ProductRegistrationComponent } from './features/logged-in/product/product-registration/product-registration.component';
import { CartComponent } from './features/public/cart/cart.component';
import { HomeAdmComponent } from './features/logged-in/home-adm/home-adm.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
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
