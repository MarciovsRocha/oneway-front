import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SignupComponent } from './features/public/signup/signup.component';
import { LoginComponent } from './features/public/login/login.component';
import { StartComponent } from './features/logged-in/start/start.component';
import { ProductListComponent } from './features/logged-in/product-list/product-list.component';
import { ProductRegistrationComponent } from './features/logged-in/product-registration/product-registration.component';

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
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
