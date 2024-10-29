import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UnitRequest } from '../interfaces/unit-request';
import { UnitResponse } from '../interfaces/unit-response';
import { Constants } from '../shared/constants';
import { BaseService } from './base-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UnitService extends BaseService<UnitRequest, UnitResponse> {

  constructor(
    protected override http: HttpClient,
    protected override router: Router
  ) {
    super(http, router);
    this.url = Constants.unit;
  }

  getUnits(): Observable<UnitResponse[]> {
    return this.getAll();
  }

  createUnit(dataFormUnit: UnitRequest): Observable<Boolean> {
    return this.create(dataFormUnit);
  }

  updateUnit(dataFormUnit: UnitRequest): Observable<Boolean> {
    return this.update(dataFormUnit);
  }

  deleteUnit(id: number): Observable<Boolean> {
    return this.delete(id);
  }
}
