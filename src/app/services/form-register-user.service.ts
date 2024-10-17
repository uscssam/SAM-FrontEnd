import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Constants } from '../shared/constants';
import { UserRequest } from '../interfaces/user-request';
import { UserResponse } from '../interfaces/user-response';
import { ErrorResponse } from '../interfaces/error-response';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class FormRegisterUserService extends  BaseService<UserRequest, UserResponse> {

  registerUser(dataFormUser: UserRequest): Observable<Boolean> {
    return this.create(dataFormUser);
  }
}
