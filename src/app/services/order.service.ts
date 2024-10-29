import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { OrderRequest } from '../interfaces/order-request';
import { OrderResponse } from '../interfaces/order-response';
import { Constants } from '../shared/constants';
import { BaseService } from './base-service';
import { ErrorResponse } from '../interfaces/error-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService<OrderRequest, OrderResponse> {

  constructor(
    protected override http: HttpClient,
    protected override router: Router
  ) {
    super(http, router);
    this.url = Constants.order;
  }

  getOrders(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(this.url)
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
