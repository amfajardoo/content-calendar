import { computed, Injectable, type Signal, signal } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class TokenManager {
	#accessToken = signal('');
	#userId = signal('');

  isLoggedIn = computed(() => !!this.#accessToken());

	get accessToken(): Signal<string> {
		return this.#accessToken.asReadonly();
	}

	get userId(): Signal<string> {
		return this.#userId.asReadonly();
	}

	set accessToken(val: string) {
		this.#accessToken.set(val);
	}

	set userId(val: string) {
		this.#userId.set(val);
	}

  clear(): void {
    this.#accessToken.set('');
    this.#userId.set('');
  }
}
