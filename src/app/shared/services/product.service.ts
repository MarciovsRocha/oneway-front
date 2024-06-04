import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}
  private apiUrl: string = environment.apiUrl;
  private endpoint: string = '/api/v1/hotel';

  private products: Product[] = [
    {
      id: 1,
      nome: 'Hotel 1',
      idTipo: 1,
      precoMedioDiaria: 150.2,
      descricao: 'teste teste teste',
      cidade: {
        id: 1,
        nome: 'Curitiba',
        estado: {
          id: 1,
          nome: 'Paraná',
          pais: {
            id: 1,
            nome: 'Brasil',
          },
        },
      },
    },
    {
      id: 2,
      nome: 'Hotel 2',
      idTipo: 1,
      precoMedioDiaria: 150.2,
      descricao: 'teste teste teste',
      cidade: {
        id: 1,
        nome: 'Curitiba',
        estado: {
          id: 1,
          nome: 'Paraná',
          pais: {
            id: 1,
            nome: 'Brasil',
          },
        },
      },
    },
    {
      id: 3,
      nome: 'Hotel 3',
      idTipo: 1,
      precoMedioDiaria: 150.2,
      descricao: 'teste teste teste',
      cidade: {
        id: 1,
        nome: 'Curitiba',
        estado: {
          id: 1,
          nome: 'Paraná',
          pais: {
            id: 1,
            nome: 'Brasil',
          },
        },
      },
    },
    {
      id: 4,
      nome: 'Hotel 4',
      idTipo: 1,
      precoMedioDiaria: 150.2,
      descricao: 'teste teste teste',
      cidade: {
        id: 1,
        nome: 'Curitiba',
        estado: {
          id: 1,
          nome: 'Paraná',
          pais: {
            id: 1,
            nome: 'Brasil',
          },
        },
      },
    },
  ];

  getAll() {
    return this.httpClient
      .get<Product[]>(`${this.apiUrl}${this.endpoint}`)
      .pipe(
        tap((value) => {
          console.log('value', value);
        })
      );
  }

  saveOrUpdate(product: any) {
    return this.httpClient
      .post<any>(`${this.apiUrl}${this.endpoint}`, product)
      .pipe(
        tap((value) => {
          console.log('value', value);
        })
      );
  }

  getAllMocked() {
    return this.products;
  }
}
