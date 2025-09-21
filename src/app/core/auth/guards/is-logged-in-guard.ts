import { inject } from '@angular/core';
import { type CanActivateFn, Router } from '@angular/router';
import { TokenManager } from '../token-manager';

export const isLoggedInGuard: CanActivateFn = () => {
	const tokenManager = inject(TokenManager);
	const router = inject(Router);

	if (!tokenManager.isLoggedIn()) {
		return router.navigate(['/login']);
	}

	return true;
};
