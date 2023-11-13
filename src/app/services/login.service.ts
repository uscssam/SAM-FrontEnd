import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { Observable, map } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { Constants } from '../shared/constants';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token!: LoginResponse;


  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  loginAuth(dataUser: LoginRequest): Observable<Boolean> {
    return this.http.post<LoginResponse>(Constants.login, dataUser)
    .pipe(
      map(resp => {
        this.token = resp;
        const tokenData = this.jwtHelper.decodeToken(resp.token);
        console.log(tokenData);
        return (resp?.token != null)
      })
    )

  }
}
