import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class DataAccess {
	#baseUrl = environment.BASE_URL;
	#http = inject(HttpClient);

	get<T>(url: string) {
		return this.#http.get<T>(`${this.#baseUrl}/${url}`, {
			reportProgress: true,
		});
	}

	post<T, K>(url: string, body: K) {
		return this.#http.post<T>(`${this.#baseUrl}/${url}`, body, {
			reportProgress: true,
		});
	}
}
