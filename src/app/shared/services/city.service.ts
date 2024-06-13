import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { City } from '../models/city';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(private httpClient: HttpClient) {}
  private apiUrl: string = environment.apiUrl;
  private endpoint: string = '/api/v1/cidade';

  getAll() {
    return this.httpClient.get<City[]>(`${this.apiUrl}${this.endpoint}`);
  }

  save(city: City) {
    return this.httpClient.post<City>(`${this.apiUrl}${this.endpoint}`, city);
  }

  update(city: City) {
    return this.httpClient.put<City>(`${this.apiUrl}${this.endpoint}`, city);
  }

  delete(id: number) {
    return this.httpClient.delete<any>(`${this.apiUrl}${this.endpoint}/id=${id}`);
  }

  getTopCitiesByProductCount(top: number) {
    return this.httpClient.get<any>(`${this.apiUrl}${this.endpoint}/produto/top=${top}`);
  }
}
