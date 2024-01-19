
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const credentials = `${'user'}:${'password'}`;
    const base64Credentials = btoa(credentials);
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + base64Credentials,
    });

    // Add your global headers here
    const modifiedRequest = request.clone({
      headers: headers
    });

    return next.handle(modifiedRequest);
  }
}