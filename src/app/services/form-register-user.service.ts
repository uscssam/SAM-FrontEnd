import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Constants } from '../shared/constants';
import { UserRequest } from '../interfaces/user-request';
import { UserResponse } from '../interfaces/user-response';

@Injectable({
  providedIn: 'root'
})
export class FormRegisterUserService {

  dataForm?: UserResponse;

  constructor(
    private http: HttpClient
  ) { }

  registerUser(dataFormUser: UserRequest): Observable<Boolean> {
    return this.http.post<UserResponse>(Constants.user, dataFormUser)
      .pipe(
        map(resp => {
          this.dataForm = resp;
          return resp.id != null;
        })
      )
  }
}
