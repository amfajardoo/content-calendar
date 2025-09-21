import {
	provideHttpClient,
	withInterceptors,
	withRequestsMadeViaParent,
} from '@angular/common/http';
import type { Routes } from '@angular/router';
import { isLoggedInGuard } from '@core/auth/guards/is-logged-in-guard';
import { redirectIfLoggedInGuard } from '@core/auth/guards/redirect-if-logged-in-guard';
import { authInterceptor } from '@core/auth/interceptors/auth-interceptor';

export const routes: Routes = [
	{
		path: 'dashboard',
		canActivate: [isLoggedInGuard],
		canActivateChild: [isLoggedInGuard],
		providers: [
			provideHttpClient(
				withInterceptors([authInterceptor]),
				withRequestsMadeViaParent(),
			),
		],
		loadComponent: () => import('@pages/dashboard/dashboard'),
	},
	{
		path: 'login',
		canActivate: [redirectIfLoggedInGuard],
		loadComponent: () => import('@core/auth/signin/signin'),
	},
	{
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full',
	},
	{
		path: '**',
		redirectTo: '',
	},
];
