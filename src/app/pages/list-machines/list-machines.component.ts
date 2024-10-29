import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StatusMachineEnum, StatusMachineEnumDescriptions } from 'src/app/enums/status-machine.enum';
import { MachineRequest } from 'src/app/interfaces/machine-request';
import { MachineResponse } from 'src/app/interfaces/machine-response';
import { MachineService } from 'src/app/services/machine.service';
import { DialogEditMachineComponent } from './dialog-edit-machine/dialog-edit-machine.component';
import { UnitResponse } from 'src/app/interfaces/unit-response';
import { UnitService } from 'src/app/services/unit.service';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { ProfileLevelEnum } from 'src/app/enums/profile-level.enum';
import { LoginService } from 'src/app/services/login.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'app-list-machines',
    templateUrl: './list-machines.component.html',
    styleUrls: ['./list-machines.component.scss']
})

export class ListMachinesComponent implements OnInit {

    listMachines: MachineResponse[] = [];
    lisUnits: UnitResponse[] = [];
    level: ProfileLevelEnum;

    constructor(
        private dialog: MatDialog,
        private machineService: MachineService,
        private unitService: UnitService,
        private loginService: LoginService
    ) {
      this.level = loginService.userLevel;
    }

    onSelectionChange(event: MatSelectChange) {
        if(event.value == 0) {
            this.getLists();
        } else {
            this.machineService.search({ idUnit: event.value }).subscribe(resp => {
                this.listMachines = resp.map(machine => {
                    return <any>{
                        ...machine,
                        unit: this.lisUnits.find(unit => machine.idUnit == unit.id)?.name
                    }
                });
            });
        }
    }

    ngOnInit() {
        this.getLists();
    }

    getLists() {
        forkJoin([
            this.getMachines(),
            this.getUnits()
        ]).subscribe(resp => {
            this.listMachines = resp[0].map(machine => {
                return <any>{
                    ...machine,
                    unit: resp[1].find(unit => machine.idUnit == unit.id)?.name
                }
            });
            this.lisUnits = resp[1];
            this.lisUnits.unshift({ id: 0, name: '[Todas]' });
        })
    }

    getStatusDescription(status: StatusMachineEnum): string {
        return StatusMachineEnumDescriptions[status];
    }

    getUnits() {
        return this.unitService.getAll();
    }

    getMachines() {
       return this.machineService.getMachines();
    }

    deleteMachine(machine: MachineResponse) {
      Swal.fire({
        text: `Excluir a máquina "${machine.name}"?"`,
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: 'Sim',
        denyButtonText: 'Não',
        allowOutsideClick: false,
      }).then(result => {
        if(result.isConfirmed) {
          const id = machine.id;
          this.machineService.deleteMachine(id).subscribe({
              next: _ => {
                  this.getLists();
                  Swal.fire({
                      text: `Máquina "${machine.name}" excluída com sucesso!`,
                      icon: 'success',
                      confirmButtonText: 'OK',
                      allowOutsideClick: false,
                  });
              },
              error: err => {
                  console.log(err);
              }
          });
        }
      });
    }

    editMachine(machine: MachineResponse) {
        const dialogRef = this.dialog.open(DialogEditMachineComponent, {
            data: machine
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
            result && this.okEditMachine(result);
        });
    }

    okEditMachine(machine: MachineRequest) {
        machine.status = machine.status;
        this.machineService.updateMachine(machine).subscribe({
            next: _ => {
                this.getLists();
            },
            error: err => { }
        });
    }
}
