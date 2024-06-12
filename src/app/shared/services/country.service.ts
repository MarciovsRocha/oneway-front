import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Country } from '../models/country';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private httpClient: HttpClient) {}
  private apiUrl: string = environment.apiUrl;
  private endpoint: string = '/api/v1/pais';

  getAll() {
    return this.httpClient.get<Country[]>(`${this.apiUrl}${this.endpoint}`);
  }

  save(country: Country) {
    return this.httpClient.post<Country>(`${this.apiUrl}${this.endpoint}`, country);
  }

  update(country: Country) {
    return this.httpClient.put<Country>(`${this.apiUrl}${this.endpoint}`, country);
  }
}
