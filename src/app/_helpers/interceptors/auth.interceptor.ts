import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpErrorResponse,
  HttpRequest,
  HttpHandlerFn
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {AuthenticationService} from "../authentication.service";

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const router = inject(Router);
  const authService = inject(AuthenticationService);

  const logoutAndRedirect = () => {
    localStorage.removeItem('sig');
    authService.clearInfo();
    router.navigate(['/'], { replaceUrl: true });
  };

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if ( error.status === 401 || error.status === 403) {
        logoutAndRedirect();
      }
      return throwError(() => error);
    })
  );
};
