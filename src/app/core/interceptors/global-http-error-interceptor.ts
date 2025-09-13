import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';

export const globalHttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    tap({
      error: (err) => {
        console.error(err);
      },
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigate(['/login'])
      }
      return throwError(() => error);
    })
  );
};
