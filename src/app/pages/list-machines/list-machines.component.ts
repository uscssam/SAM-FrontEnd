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

@Component({
    selector: 'app-list-machines',
    templateUrl: './list-machines.component.html',
    styleUrls: ['./list-machines.component.scss']
})

export class ListMachinesComponent implements OnInit {

    listMachines: MachineResponse[] = [];
    lisUnits: UnitResponse[] = [];

    constructor(
        private dialog: MatDialog,
        private machineService: MachineService,
        private unitService: UnitService
    ) { }

    
    ngOnInit() { 
        this.getLists();
    }

    getLists() {
        forkJoin(
            this.getMachines(),
            this.getUnits()
        ).subscribe(resp => {
            this.listMachines = resp[0].map(machine => {
                return <any>{
                    ...machine,
                    unit: resp[1].find(unit => machine.idUnit == unit.id)?.name
                }
            });
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
        const id = machine.id;
        this.machineService.deleteMachine(id).subscribe({
            next: _ => {
                this.getLists();
                alert('Máquina deletada com sucesso!')
            },
            error: err => {
                console.log(err);

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
