import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Constants } from '../shared/constants';
import { UserResponse } from '../interfaces/user-response';
import { UserRequest } from '../interfaces/user-request';
import { BaseService } from './base-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<UserRequest, UserResponse> {

  constructor(
    protected override http: HttpClient,
    protected override router: Router
  ) {
    super(http, router);
    this.url = Constants.user;
  }

  getUsers(): Observable<UserResponse[]> {
    return this.getAll();
  }

  createUser(dataFormUser: UserRequest): Observable<Boolean> {
    return this.create(dataFormUser);
  }

  updateUser(dataFormUser: UserRequest): Observable<Boolean> {
    return this.update(dataFormUser);
  }

  deleteUser(id: number): Observable<Boolean> {
    return this.delete(id);
  }
}
