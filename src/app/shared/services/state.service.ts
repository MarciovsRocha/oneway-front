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

  save(state: State) {
    return this.httpClient.post<State>(`${this.apiUrl}${this.endpoint}`, state);
  }

  update(state: State) {
    return this.httpClient.put<State>(`${this.apiUrl}${this.endpoint}`, state);
  }
}
