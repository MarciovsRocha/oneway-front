import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';
import { SignupResponse } from '../types/signup-response.type';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    return this.httpClient
      .post<LoginResponse>('/login', { email, password })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token);
          sessionStorage.setItem('email', value.email);
          sessionStorage.setItem('username', value.name);
        })
      );
  }

  signup(name: string, email: string, password: string) {
    return this.httpClient
      .post<SignupResponse>('/signup', { name, email, password })
      .pipe(
        tap((value) => {
          console.log("Signup Response", value.email);
        })
      );
  }
}
