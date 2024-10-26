import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CepResponse } from '../interfaces/cep-response';
import { ErrorResponse } from '../interfaces/error-response';
import { Constants } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = Constants.cep;
  }

  getCep(cep: string): Observable<CepResponse> {
    const _cep = cep && cep.replace(/[^\w\s]/gi, '');
    return this.http.get<CepResponse>(`${this.url}${_cep}/json`)
      .pipe(
        map(resp => resp),
        catchError((error: ErrorResponse) => {
          console.error(error.error);
          return throwError(() => new Error(error.error));
        })
      );
  }

}
