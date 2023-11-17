import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Constants } from '../shared/constants';
import { UserResponse } from '../interfaces/user-response';
import { UserRequest } from '../interfaces/user-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(Constants.user)
  }

  createUser(dataFormUser: UserRequest): Observable<Boolean> {
    return this.http.post<UserResponse>(Constants.user, dataFormUser)
      .pipe(
        map(resp => {
          return resp.id != null;
        })
      )
  }

  updateUser(dataFormUser: UserRequest): Observable<Boolean> {
    return this.http.put<UserResponse>(Constants.user, dataFormUser)
      .pipe(
        map(resp => {
          return resp.id != null;
        })
      )
  }

  deleteUser(id: string): Observable<UserResponse> {
    return this.http.delete<UserResponse>(`${Constants.user}?id=${id}`)
  }

}
