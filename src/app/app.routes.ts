import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SignupComponent } from './features/public/signup/signup.component';
import { LoginComponent } from './features/public/login/login.component';
import { StartComponent } from './features/logged-in/start/start.component';
import { ProductRegistrationComponent } from './features/logged-in/product-registration/product-registration.component';
import { ProductListComponent } from './features/logged-in/product-list/product-list.component';

export const routes: Routes = [
  {
    path: '',
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
    path: 'products',
    component: ProductListComponent,
    children: [
      ...['', ':id'].map((path) => ({
        path,
        component: ProductRegistrationComponent,
      })),
    ],
  },
];
