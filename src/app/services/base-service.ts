import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { BaseResponse } from '../interfaces/base-response';
import { BaseRequest } from '../interfaces/base.request';
import { ErrorResponse } from '../interfaces/error-response';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export abstract class BaseService<T extends BaseRequest, K extends BaseResponse> {

    constructor(protected http: HttpClient, protected router: Router) { }

    protected url: string = '';
    protected dataForm?: K;

    private handle401Error(error: HttpErrorResponse): Observable<never> {
      if (error.status === 401) {
          Swal.fire({
              icon: 'warning',
              text: 'Sessão Expirada',
          }).then(() => {
              this.router.navigate(['/login']);
          });
      }
      else {
        return throwError(() => error);
      }
      return throwError(() => null);
  }

    threatError(error: ErrorResponse): Observable<never> {
      if(error != null) {
        Swal.fire({
            icon: 'error',
            text: error.error,
        });
      }
        return throwError(() => new Error(error.error));
    }

    getAll(): Observable<K[]> {
        return this.http.get<K[]>(this.url)
            .pipe(
                map(resp => {
                    return resp;
                }),
                catchError(this.handle401Error.bind(this)),
                catchError((error: ErrorResponse) => this.threatError(error))
            );
    }

    search(data: T): Observable<K[]> {
        return this.http.post<K[]>(`${this.url}search`, data)
            .pipe(
                map(resp => {
                    return resp;
                }),
                catchError(this.handle401Error.bind(this)),
                catchError((error: ErrorResponse) => this.threatError(error))
            );
    }

    getById(id: number): Observable<K> {
        return this.http.get<K>(`${this.url}/${id}`)
            .pipe(
                map(resp => resp),
                catchError(this.handle401Error.bind(this)),
                catchError((error: ErrorResponse) => this.threatError(error))
            );
    }

    create(data: T): Observable<boolean> {
        return this.http.post(this.url, data)
            .pipe(
                map(resp => {
                    this.dataForm = resp as K;
                    return this.dataForm.id != null;
                }),
                catchError(this.handle401Error.bind(this)),
                catchError((error: ErrorResponse) => this.threatError(error))
            );
    }

    update(data: T): Observable<boolean> {
        return this.http.put(`${this.url}${data.id}`, data)
            .pipe(
                map(resp => {
                    this.dataForm = resp as K;
                    return this.dataForm.id != null;
                }),
                catchError(this.handle401Error.bind(this)),
                catchError((error: ErrorResponse) => this.threatError(error))
            );
    }

    delete(id: number): Observable<boolean> {
        return this.http.delete(`${this.url}${id}`)
            .pipe(
                map(resp => {
                    return resp as boolean;
                }),
                catchError(this.handle401Error.bind(this)),
                catchError((error: ErrorResponse) => this.threatError(error))
            );
    }
}
