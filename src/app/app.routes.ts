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
		providers: [
			provideHttpClient(
				withInterceptors([authInterceptor]),
				withRequestsMadeViaParent(),
			),
		],
		loadChildren: () =>
			import('@pages/dashboard/dashboard.routes').then(
				(m) => m.DASHBOARD_ROUTES,
			),
	},
	{
		path: 'login',
		canActivate: [redirectIfLoggedInGuard],
		loadComponent: () => import('@core/auth/signin/signin'),
	},
	{
		path: '**',
		redirectTo: '',
	},
];
