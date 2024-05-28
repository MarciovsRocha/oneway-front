import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Produto } from '../../shared/models/produto';
import { Hotel } from '../../shared/models/Hotel';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  constructor(private httpClient: HttpClient) {}
  private apiUrl: string = environment.apiUrl;
  private endpoint: string = '/api/v1/hotel';

  private products: Hotel[] = [
    { id: 1, nome: 'Teste 1', descricao:  'Melhor teste 1', precoMedioDiaria: 50.0, id_Cidade: 1 },
    { id: 2, nome: 'Teste 2', descricao:  'Melhor teste 2', precoMedioDiaria: 50.0, id_Cidade: 1 },
    { id: 3, nome: 'Teste 3', descricao:  'Melhor teste 3', precoMedioDiaria: 50.0, id_Cidade: 1 },
    { id: 4, nome: 'Teste 4', descricao:  'Melhor teste 3', precoMedioDiaria: 50.0, id_Cidade: 1 },
  ]

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

  getAllMocked() {
    return this.products
  }
}
