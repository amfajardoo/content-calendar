import type { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { type RequestStatus } from '@core/data-access/app.store';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStoreFeature, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { Auth } from './auth';
import type { SignInForm } from './models/auth.model';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { TokenManager } from './token-manager';

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

export function withAuthStore() {
  return signalStoreFeature(
    withState(initialAuthState),
    withMethods((store, auth = inject(Auth), tokenManager = inject(TokenManager)) => ({
      login: rxMethod<SignInForm>(
        pipe(
          tap(() => patchState(store, { isLoading: true, loadState: 'pending' })),
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
              })
            )
          )
        )
      ),
    })),
    withDevtools('auth')
  );
}
