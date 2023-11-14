import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../interfaces/login-request';
import { Observable, Subject, map } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response';
import { Constants } from '../shared/constants';
import { jwtDecode } from 'jwt-decode';
import { UserClaim } from '../interfaces/user-claim';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string = '';
  tokenData?: UserClaim;
  onTokenData: Subject<UserClaim | undefined> = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  loginAuth(dataUser: LoginRequest): Observable<Boolean> {
    return this.http.post<LoginResponse>(Constants.login, dataUser)
      .pipe(
        map(resp => {
          this.token = resp.token;
          this.tokenData = jwtDecode(resp.token);
          this.onTokenData.next(this.tokenData);
          return (resp?.token != null)
        })
      )
  }
}
