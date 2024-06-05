import { Injectable } from '@angular/core';
import { State } from '../models/state';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  constructor(private httpClient: HttpClient) {}
  private apiUrl: string = environment.apiUrl;
  private endpoint: string = '/api/v1/estado';

  getAll() {
    return this.httpClient.get<State[]>(`${this.apiUrl}${this.endpoint}`);
  }
}
