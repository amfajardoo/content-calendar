import { Injectable, inject, signal } from '@angular/core';
import { DataAccess } from '@core/data-access/data-access';
import type { AuthResponse, SignInForm } from './models/auth.model';

@Injectable({
	providedIn: 'root',
})
export class Auth {
	#authUrl = 'auth';
	#dataAccess = inject(DataAccess);

	login(credentials: SignInForm) {
		return this.#dataAccess.post<AuthResponse, SignInForm>(
			this.#authUrl,
			credentials,
		);
	}
}
