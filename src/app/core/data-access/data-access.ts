import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BASE_URL } from './base-url.token';

@Injectable({
	providedIn: 'root',
})
export class DataAccess {
	#baseUrl = inject(BASE_URL);
	#http = inject(HttpClient);

	get<T>(url: string) {
		return this.#http.get<T>(`${this.#baseUrl}/${url}`);
	}

	post<T, K>(url: string, body: K) {
		return this.#http.post<T>(`${this.#baseUrl}/${url}`, body);
	}
}
