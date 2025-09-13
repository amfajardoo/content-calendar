import {
  HttpEvent,
  HttpEventType,
  HttpHandlerFn,
  HttpRequest
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export function authRedirectInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const router = inject(Router);
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        const response = event;
        const body = response.body as { accessToken?: string };
        if (body?.accessToken) {
          localStorage.setItem('accessToken', body.accessToken);
          router.navigate(['/dashboard']);
        }
      }
    })
  );
}
