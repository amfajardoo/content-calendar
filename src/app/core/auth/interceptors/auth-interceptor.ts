// src/app/core/interceptors/auth.interceptor.ts

import {
	HttpErrorResponse,
	type HttpInterceptorFn,
	type HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import {
	BehaviorSubject,
	catchError,
	filter,
	switchMap,
	take,
	tap,
	throwError,
} from 'rxjs';
import { AuthStore } from '../../auth/auth.store';
import { Auth } from '../auth';
import { TokenManager } from '../token-manager';
import { patchState } from '@ngrx/signals';

let isRefreshing = false;
const refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<
	string | null
>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
	const tokenManager = inject(TokenManager);
	const authService = inject(Auth);
	const authStore = inject(AuthStore);

	if (req.url.includes('auth/refresh-token')) {
		return next(req);
	}

	const token = tokenManager.accessToken();
	const userId = tokenManager.userId();

	const cloned = req.clone({
		setHeaders: {
			Authorization: token ? `Bearer ${token}` : '',
			'X-User-Id': userId || '',
		},
		withCredentials: true,
	});

	return next(cloned).pipe(
		catchError((error) => {
			if (
				error instanceof HttpErrorResponse &&
				error.status === 401 &&
				!isRefreshing
			) {
				isRefreshing = true;
				refreshTokenSubject.next(null);

				return authService.refreshToken().pipe(
					tap(({ accessToken, userId }) => {
						tokenManager.accessToken = accessToken;
						tokenManager.userId = userId;
						patchState(authStore, { isLoading: true });
						refreshTokenSubject.next(accessToken);
					}),
					switchMap((res) => {
						isRefreshing = false;
						return next(addToken(req, res.accessToken, res.userId));
					}),
					catchError((err) => {
						isRefreshing = false;
						tokenManager.clear();
						authStore.logout();
						return throwError(() => err);
					}),
				);
			} else if (isRefreshing) {
				return refreshTokenSubject.pipe(
					filter((token) => token !== null),
					take(1),
					switchMap(() =>
						next(
							addToken(req, tokenManager.accessToken(), tokenManager.userId()),
						),
					),
				);
			}

			return throwError(() => error);
		}),
	);
};

function addToken(
	request: HttpRequest<unknown>,
	token: string,
	userId: string,
): HttpRequest<unknown> {
	return request.clone({
		setHeaders: {
			Authorization: `Bearer ${token}`,
			'X-User-Id': userId,
		},
	});
}
