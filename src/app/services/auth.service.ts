import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';
import { SignupResponse } from '../types/signup-response.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  private apiUrl: string = environment.apiUrl;
  private endpoint: string = '/auth';

  login(email: string, password: string) {
    return this.httpClient
      .post<LoginResponse>(`${this.apiUrl}${this.endpoint}/login`, {
        email,
        password,
      })
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
      .post<SignupResponse>(`${this.apiUrl}${this.endpoint}/signup`, {
        name,
        email,
        password,
      })
      .pipe(
        tap((value) => {
          console.log('Signup Response', value.email);
        })
      );
  }
}
