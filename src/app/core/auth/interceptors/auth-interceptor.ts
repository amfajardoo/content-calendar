import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenManager } from '../token-manager';

const AUTH_EXCLUDED_URLS = ['auth'];

function isExcluded(url: string, excluded: string[]) {
	return excluded.some((e) => url.includes(e));
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const tokenManager = inject(TokenManager);

	if (isExcluded(req.url, AUTH_EXCLUDED_URLS)) return next(req);

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
