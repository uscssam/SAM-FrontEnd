import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { BaseResponse } from '../interfaces/base-response';
import { BaseRequest } from '../interfaces/base.request';
import { ErrorResponse } from '../interfaces/error-response';

@Injectable({
    providedIn: 'root'
})
export abstract class BaseService<T extends BaseRequest, K extends BaseResponse> {

    constructor(protected http: HttpClient) { }

    protected url: string = '';
    protected dataForm?: K;

    getAll(): Observable<K[]> {
        return this.http.get<K[]>(this.url)
            .pipe(
                map(resp => {
                    return resp;
                }),
                catchError((error: ErrorResponse) => {
                    console.error(error.error);
                    return throwError(() => new Error(error.error));
                })
            );
    }

    getById(id: number): Observable<K> {
        return this.http.get<K>(`${this.url}/${id}`)
            .pipe(
                map(resp => resp),
                catchError((error: ErrorResponse) => {
                    console.error(error.error);
                    return throwError(() => new Error(error.error));
                })
            );
    }

    create(data: T): Observable<boolean> {
        return this.http.post(this.url, data)
            .pipe(
                map(resp => {
                    this.dataForm = resp as K;
                    return this.dataForm.id != null;
                }),
                catchError((error: ErrorResponse) => {
                    console.error(error.error);
                    return throwError(() => new Error(error.error));
                })
            );
    }

    update(data: T): Observable<boolean> {
        return this.http.put(`${this.url}`, data)
            .pipe(
                map(resp => {
                    this.dataForm = resp as K;
                    return this.dataForm.id != null;
                }),
                catchError((error: ErrorResponse) => {
                    console.error(error.error);
                    return throwError(() => new Error(error.error));
                })
            );
    }

    delete(id: number): Observable<boolean> {
        return this.http.delete(`${this.url}${id}`)
            .pipe(
                map(resp => {
                    return resp as boolean;
                }),
                catchError((error: ErrorResponse) => {
                    console.error(error.error);
                    return throwError(() => new Error(error.error));
                })
            );
    }
}
