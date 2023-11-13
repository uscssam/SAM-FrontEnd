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

  token?: LoginResponse;
  tokenData?: UserClaim;
  onTokenData: Subject<UserClaim | undefined> = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  loginAuth(dataUser: LoginRequest): Observable<Boolean> {
    return this.http.post<LoginResponse>(Constants.Login, dataUser)
    .pipe(
      map(resp => {
        this.token = resp;
        this.tokenData = jwtDecode(resp.token);
        // const claim = {
        //   "sub": "SAM",
        //   "module": "SAM",
        //   "name": "alice",
        //   "fullname": "Alice Angela",
        //   "role": "Manager",
        //   "exp": 1699831238,
        //   "iss": "SAM",
        //   "aud": "SAM"
        // }
        // this.tokenData = claim;
        this.onTokenData.next(this.tokenData);
        return (resp?.token != null)
      })
    )

  }
}
