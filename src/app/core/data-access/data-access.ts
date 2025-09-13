import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataAccess {
  #baseUrl = 'http://localhost:3000';
  #prefix = 'api/v1';
  #http = inject(HttpClient);

  get<T>(url: string) {
    return this.#http.get<T>(`${this.#baseUrl}/${this.#prefix}/${url}`, { reportProgress: true });
  }

  post<T, K>(url: string, body: K) {
    return this.#http.post<T>(`${this.#baseUrl}/${this.#prefix}/${url}`, body, { reportProgress: true });
  }
}
