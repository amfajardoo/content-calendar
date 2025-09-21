import { Injectable, inject } from '@angular/core';
import { DataAccess } from '@core/data-access/data-access';
import type { Observable } from 'rxjs';
import type { AuthResponse, SignInForm } from './models/auth.model';

@Injectable({
	providedIn: 'root',
})
export class Auth {
	#authUrl = 'auth';
	#dataAccess = inject(DataAccess);

	login(credentials: SignInForm): Observable<AuthResponse> {
		return this.#dataAccess.post<AuthResponse, SignInForm>(
			this.#authUrl,
			credentials,
		);
	}

	refreshToken(): Observable<AuthResponse> {
		return this.#dataAccess.get<AuthResponse>(`${this.#authUrl}/refresh-token`);
	}
}
