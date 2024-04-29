import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { Observable, tap } from 'rxjs';
import { SignupResponse } from '../types/signup-response.type';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logoutEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private httpClient: HttpClient) {}
  private apiUrl: string = environment.apiUrl;
  private endpoint: string = '/user';

  login(email: string, senha: string) {
    return this.httpClient
      .post<LoginResponse>(`${this.apiUrl}${this.endpoint}/authenticate`, {
        email,
        senha,
      })
      .pipe(
        tap((value) => {
          sessionStorage.setItem('auth-token', value.token);
          sessionStorage.setItem('email', value.email);
          sessionStorage.setItem('nome', value.nome);
        })
      );
  }

  signup(user: User): Observable<SignupResponse> {
    return this.httpClient.post<SignupResponse>(`${this.apiUrl}${this.endpoint}`, user);
  }

  logout(): void {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('nome');
    this.logoutEvent.emit();
  }
}