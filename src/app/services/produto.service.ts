import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  constructor(private httpClient: HttpClient) {}
  private apiUrl: string = environment.apiUrl;
  private endpoint: string = '/produto';

  getAll() {
    return this.httpClient.get<Produto[]>(`${this.apiUrl}${this.endpoint}`)
      .pipe(tap((value) => {
          console.log("value", value)
        })
      );
  }
}
