import { computed, Injectable, type Signal, signal } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class TokenManager {
	#accessToken = signal(sessionStorage.getItem('accessToken') || '');
	#userId = signal(sessionStorage.getItem('userId') || '');

	isLoggedIn = computed(() => !!this.#accessToken());

	get accessToken(): Signal<string> {
		return this.#accessToken.asReadonly();
	}

	get userId(): Signal<string> {
		return this.#userId.asReadonly();
	}

	set accessToken(val: string) {
		this.#accessToken.set(val);
		sessionStorage.setItem('accessToken', val);
	}

	set userId(val: string) {
		this.#userId.set(val);
		sessionStorage.setItem('userId', val);
	}

	clear(): void {
		this.#accessToken.set('');
		this.#userId.set('');
		sessionStorage.removeItem('accessToken');
		sessionStorage.removeItem('userId');
	}
}
