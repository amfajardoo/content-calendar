import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenManager } from '../token-manager';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const tokenManager = inject(TokenManager);

	const token = tokenManager.accessToken();
	const userId = tokenManager.userId();

	let cloned = req;
	if (token && userId) {
		cloned = req.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`,
				'X-User-Id': userId,
			},
		});
	}

	return next(cloned);
};
