import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MachineRequest } from '../interfaces/machine-request';
import { Observable, map } from 'rxjs';
import { Constants } from '../shared/constants';
import { MachineResponse } from '../interfaces/machine-response';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(
    private http: HttpClient,
  ) { }

  getMachines(): Observable<MachineResponse[]> {
    console.log('CHAMOU A SERVICE');
    return this.http.get<MachineResponse[]>(Constants.machine)
  }

  createMachine(dataFormMachine: MachineRequest): Observable<Boolean> {
    return this.http.post<MachineRequest>(Constants.machine, dataFormMachine)
      .pipe(
        map(_ => {
          console.log("CADASTROU A MÁQUINA");
          return true;
        })
      )
  }

  updateMachine(dataFormMachine: MachineRequest): Observable<Boolean> {
    return this.http.put<MachineResponse>(Constants.machine, dataFormMachine)
      .pipe(
        map(resp => {
          return resp.id != null;
        })
      )
  }

  deleteMachine(id: string): Observable<MachineResponse> {
    return this.http.delete<MachineResponse>(`${Constants.machine}?id=${id}`)
  }
}
