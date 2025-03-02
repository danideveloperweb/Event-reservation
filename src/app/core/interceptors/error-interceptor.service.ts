import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private readonly router: Router) {}

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse): Observable<HttpEvent<unknown>> => {
        if (error.url && error.url.includes('assets/data/event-info') && error.status === 404) {
          this.router.navigate(['/not-found']);
        } else if (error.status === 404) {
          console.error('Recurso no encontrado (404)', error);
        } else if (error.status === 401) {
          console.error('No autorizado (401)', error);
        } else {
          console.error('Ocurrió un error HTTP', error);
        }
        return throwError(() => error);
      })
    );
  }
}
