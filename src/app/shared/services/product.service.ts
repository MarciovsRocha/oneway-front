import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product';
import { ProductTypesDTO } from '../helper/product-types-dto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}
  private apiUrl: string = environment.apiUrl;
  private endpoint: string = '/api/v1/produto';

  private productsTypeHotel: Product[] = [
    {
      id: 1,
      nome: 'Hotel 1',
      id_Tipo: 1,
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
      id_Tipo: 1,
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
      id_Tipo: 1,
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
      id_Tipo: 1,
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

  private productsTypeTransport: Product[] = [
    {
      id: 5,
      nome: 'Transporte 1',
      id_Tipo: 2,
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
      id: 6,
      nome: 'Transporte 2',
      id_Tipo: 2,
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
      id: 7,
      nome: 'Transporte 3',
      id_Tipo: 2,
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
      id: 8,
      nome: 'Transporte 4',
      id_Tipo: 2,
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

  private productsTypeAttraction: Product[] = [
    {
      id: 9,
      nome: 'Ponto Turístico 1',
      id_Tipo: 3,
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
      id: 10,
      nome: 'Ponto Turístico 2',
      id_Tipo: 3,
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
      id: 11,
      nome: 'Ponto Turístico 3',
      id_Tipo: 3,
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
      id: 12,
      nome: 'Ponto Turístico 4',
      id_Tipo: 3,
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
    return this.httpClient.get<Product[]>(`${this.apiUrl}${this.endpoint}`);
  }

  getAllByType(id: number) {
    return this.httpClient.get<Product[]>(
      `${this.apiUrl}${this.endpoint}/type=${id}`
    );
  }

  save(product: Product) {
    return this.httpClient.post<Product>(`${this.apiUrl}${this.endpoint}`, product);
  }

  update(product: Product) {
    return this.httpClient.put<Product>(`${this.apiUrl}${this.endpoint}`, product);
  }

  getAllMocked() {
    return this.productsTypeHotel;
  }

  getAllByTypeMocked(id: number) {
    switch (id) {
      case 1:
        return this.productsTypeHotel;
      case 2:
        return this.productsTypeTransport;
      case 3:
        return this.productsTypeAttraction;
      default:
        return [];
    }
  }

  delete(id: number) {
    return this.httpClient.delete<any>(`${this.apiUrl}${this.endpoint}/id=${id}`);
  }

  getTotalProductsByType() {
    return this.httpClient.get<ProductTypesDTO[]>(
      `${this.apiUrl}${this.endpoint}/total/type`
    );
  }
}
