import type { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Auth } from './auth';
import type { SignInForm } from './models/auth.model';
import { TokenManager } from './token-manager';

export type RequestStatus = 'idle' | 'pending' | 'fulfilled';

export interface AuthState {
	isLoggedIn: boolean;
	isLoading: boolean;
	error: string | null;
	loadState: RequestStatus;
}

const initialAuthState: AuthState = {
	isLoggedIn: false,
	isLoading: false,
	error: null,
	loadState: 'idle',
};

export const AuthStore = signalStore(
	{ providedIn: 'root' },
	withState<AuthState>(initialAuthState),
	withMethods(
		(store, auth = inject(Auth), tokenManager = inject(TokenManager)) => ({
			login: rxMethod<SignInForm>(
				pipe(
					tap(() =>
						patchState(store, { isLoading: true, loadState: 'pending' }),
					),
					switchMap((credentials) =>
						auth.login(credentials).pipe(
							tapResponse({
								next: ({ accessToken, userId }) => {
									tokenManager.accessToken = accessToken;
									tokenManager.userId = userId;
									patchState(store, {
										isLoading: false,
										loadState: 'fulfilled',
										isLoggedIn: true,
									});
								},
								error: (err: HttpErrorResponse) => {
									patchState(store, {
										error: err.statusText || 'something went wrong',
										isLoading: false,
										loadState: 'fulfilled',
									});
								},
							}),
						),
					),
				),
			),
		}),
	),
	withDevtools('auth'),
);
