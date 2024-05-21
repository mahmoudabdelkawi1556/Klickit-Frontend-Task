import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let userToken = localStorage.getItem('token');
    if (!userToken) {
      return next.handle(request);
    }
    let cloneRequest = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + userToken)
    });
    return next.handle(cloneRequest).pipe(catchError(error => {
      console.log('Interceptor Error:', error);
      throw 'Error' + error;
    }));

  }
}
