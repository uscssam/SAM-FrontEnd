import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { OrderRequest } from '../interfaces/order-request';
import { OrderResponse } from '../interfaces/order-response';
import { Constants } from '../shared/constants';
import { BaseService } from './base-service';
import { OrderGetResponse } from '../interfaces/order-response-get';
import { ErrorResponse } from '../interfaces/error-response';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<OrderRequest, OrderResponse> {

  constructor(
    protected override http: HttpClient
  ) {
    super(http);
    this.url = Constants.order;
  }

  getOrders(): Observable<OrderGetResponse[]> {
    return this.http.get<OrderGetResponse[]>(this.url)
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

  createOrder(payload: OrderRequest): Observable<Boolean> {
    return this.create(payload);
  }

  updateOrder(payload: OrderRequest): Observable<Boolean> {
    return this.update(payload);
  }

  deleteOrder(id: number): Observable<Boolean> {
    return this.delete(id);
  }
}
