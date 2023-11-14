import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Injectable()
export class SamInterceptor implements HttpInterceptor {

  constructor(
    private loginService: LoginService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = req.headers
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.loginService.token}`);
    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }

}

