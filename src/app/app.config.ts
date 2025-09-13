import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
	type ApplicationConfig,
	provideBrowserGlobalErrorListeners,
	provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideDevtoolsConfig } from '@angular-architects/ngrx-toolkit';
import { authInterceptor } from '@core/auth/interceptors/auth-interceptor';
import { authRedirectInterceptor } from '@core/auth/interceptors/auth-redirect-interceptor';
import { globalHttpErrorInterceptor } from '@core/interceptors/global-http-error-interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZonelessChangeDetection(),
		provideRouter(routes, withHashLocation()),
		provideHttpClient(
			withInterceptors([
				globalHttpErrorInterceptor,
				authRedirectInterceptor,
				authInterceptor,
			]),
		),
		provideDevtoolsConfig({ name: 'Content Calendar' }),
	],
};
