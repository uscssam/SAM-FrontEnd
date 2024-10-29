import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginRequest } from '../interfaces/login-request';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { LoginResponse } from '../interfaces/login-response';
import { Constants } from '../shared/constants';
import { UserClaim } from '../interfaces/user-claim';
import { ErrorResponse } from '../interfaces/error-response';
import { ProfileLevelEnum } from '../enums/profile-level.enum';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token: string = '';
  private _tokenData: BehaviorSubject<UserClaim | undefined> = new BehaviorSubject<UserClaim | undefined>(undefined);
  onTokenData = this._tokenData.asObservable();
  idUser: number = -1;
  userLevel: number = -1;

  constructor(
    private http: HttpClient
  ) {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      this.token = storedToken;
      const tokenData = jwtDecode<UserClaim>(this.token);
      this.userLevel = Number(ProfileLevelEnum[tokenData.role]);
      this.idUser = Number(tokenData.idUser);
      this._tokenData.next(tokenData);
    }
  }

  loginAuth(dataUser: LoginRequest): Observable<Boolean> {
    return this.http.post<LoginResponse>(Constants.login, dataUser)
      .pipe(
        map(resp => {
          this.token = resp.token;
          sessionStorage.setItem('token', this.token);
          const tokenData = jwtDecode<UserClaim>(resp.token);
          this.userLevel = Number(ProfileLevelEnum[tokenData.role]);
          this.idUser = Number(tokenData.idUser);
          this._tokenData.next(tokenData);
          return (resp?.token != null);
        }),
        catchError((error: ErrorResponse) => {
          return throwError(() => new Error(error.error));
        })
      );
  }
}
