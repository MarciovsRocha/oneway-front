import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { SignupComponent } from './features/public/signup/signup.component';
import { LoginComponent } from './features/public/login/login.component';
import { StartComponent } from './features/logged-in/start/start.component';
import { HotelRegistrationComponent } from './features/logged-in/hotel-registration/hotel-registration.component';

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
    path: 'hotel',
    children: [{ path: 'registration', component: HotelRegistrationComponent }],
  },
];
