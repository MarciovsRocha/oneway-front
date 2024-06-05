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
}
