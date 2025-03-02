import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ErrorInterceptorService } from './error-interceptor.service';

describe('ErrorInterceptorService', () => {
  let service: HttpClient;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
      ]
    });

    service = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should redirect to /not-found if the URL includes "assets/data/event-info" and returns 404', () => {
    service.get('/assets/data/event-info').subscribe({
      error: () => { }
    });

    const req = httpMock.expectOne('/assets/data/event-info');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/not-found']);
  });

  it('should log an error if the response is 404 without redirection', () => {
    spyOn(console, 'error');

    service.get('/other-resources').subscribe({
      error: () => { }
    });

    const req = httpMock.expectOne('/other-resources');
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });

    expect(console.error).toHaveBeenCalledWith('Recurso no encontrado (404)', jasmine.any(HttpErrorResponse));
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should log an error if the response is 401 (Unauthorized)', () => {
    spyOn(console, 'error');

    service.get('/protected').subscribe({
      error: () => { }
    });

    const req = httpMock.expectOne('/protected');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });

    expect(console.error).toHaveBeenCalledWith('No autorizado (401)', jasmine.any(HttpErrorResponse));
  });

  it('should log a generic error for other HTTP error codes', () => {
    spyOn(console, 'error');

    service.get('/other-error').subscribe({
      error: () => { }
    });

    const req = httpMock.expectOne('/other-error');
    req.flush('Unknown error', { status: 500, statusText: 'Internal Server Error' });

    expect(console.error).toHaveBeenCalledWith('Ocurrió un error HTTP', jasmine.any(HttpErrorResponse));
  });

  it('should not log an error or redirect if the response is successful', () => {
    spyOn(console, 'error');

    service.get('/valid-request').subscribe(response => {
      expect(response).toEqual({ message: 'Success' });
    });

    const req = httpMock.expectOne('/valid-request');
    req.flush({ message: 'Success' }, { status: 200, statusText: 'OK' });

    expect(console.error).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
