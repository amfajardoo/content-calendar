import type { Routes } from '@angular/router';
import { isLoggedInGuard } from '@core/auth/guards/is-logged-in-guard';
import { redirectIfLoggedInGuard } from '@core/auth/guards/redirect-if-logged-in-guard';


export const routes: Routes = [
	{
		path: 'dashboard',
		canActivate: [isLoggedInGuard],
		canActivateChild: [isLoggedInGuard],
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
	}
];
