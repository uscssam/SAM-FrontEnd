import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MachineRequest } from '../interfaces/machine-request';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Constants } from '../shared/constants';
import { MachineResponse } from '../interfaces/machine-response';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class MachineService extends BaseService<MachineRequest, MachineResponse> {

  constructor(
    protected override http: HttpClient
  ) {
    super(http);
    this.url = Constants.machine;
  }

  getMachines(): Observable<MachineResponse[]> {
    return this.getAll();
  }

  createMachine(dataFormMachine: MachineRequest): Observable<Boolean> {
    return this.create(dataFormMachine);
  }

  updateMachine(dataFormMachine: MachineRequest): Observable<Boolean> {
    return this.update(dataFormMachine);
  }

  deleteMachine(id: number): Observable<Boolean> {
    return this.delete(id);
  }
}
