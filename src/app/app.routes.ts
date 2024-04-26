import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SignupComponent } from './features/signup/signup.component';
import { LoginComponent } from './features/login/login.component';
import { StartComponent } from './features/start/start.component';

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
];
