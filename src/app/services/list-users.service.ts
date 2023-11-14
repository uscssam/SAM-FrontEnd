import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../shared/constants';
import { UserResponse } from '../interfaces/user-response';

@Injectable({
  providedIn: 'root'
})
export class ListUsersService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(Constants.user)
  }
}
