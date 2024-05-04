import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Produto } from '../models/produto';
import { Hotel } from '../models/Hotel';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  constructor(private httpClient: HttpClient) {}
  private apiUrl: string = environment.apiUrl;
  private endpoint: string = '/api/v1/hotel';

  getAll() {
    return this.httpClient.get<Hotel[]>(`${this.apiUrl}${this.endpoint}`)
      .pipe(tap((value) => {
          console.log("value", value)
        })
      );
  }

  saveOrUpdate(product: any) {
    return this.httpClient.post<any>(`${this.apiUrl}${this.endpoint}`, product)
      .pipe(tap((value) => {
          console.log("value", value)
        })
      );
  }
}
