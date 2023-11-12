import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { Observable, map } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { Constants } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token!: LoginResponse;

  constructor(
    private http: HttpClient
  ) { }

  loginAuth(dataUser: LoginRequest): Observable<Boolean> {
    return this.http.post<LoginResponse>(Constants.login, dataUser)
    .pipe(
      map(resp => {
        this.token = resp;
        return (resp?.token != null)
      })
    )

  }
}
