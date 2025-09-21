import type { Route } from '@angular/router';
import Dashboard from './dashboard';
import { isLoggedInGuard } from '@core/auth/guards/is-logged-in-guard';
import { Overview } from './overview/overview';

export const DASHBOARD_ROUTES: Route[] = [
	{
		path: '',
		component: Dashboard,
		canActivateChild: [isLoggedInGuard],
		children: [
			{ path: '', component: Overview },
			{
				path: 'categories',
				loadComponent: () => import('../categories/categories'),
			},
			{
				path: 'goals',
				loadComponent: () => import('../goals/goals'),
			},
			{
				path: 'transactions',
				loadComponent: () => import('../transactions/transactions'),
			},
		],
	},
	{
		path: '**',
		redirectTo: '',
	},
];
