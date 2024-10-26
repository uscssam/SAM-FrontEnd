import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StatusMachineEnum, StatusMachineEnumDescriptions } from 'src/app/enums/status-machine.enum';
import { MachineRequest } from 'src/app/interfaces/machine-request';
import { MachineResponse } from 'src/app/interfaces/machine-response';
import { MachineService } from 'src/app/services/machine.service';
import { DialogEditMachineComponent } from './dialog-edit-machine/dialog-edit-machine.component';

@Component({
    selector: 'app-list-machines',
    templateUrl: './list-machines.component.html',
    styleUrls: ['./list-machines.component.scss']
})

export class ListMachinesComponent implements OnInit {

    listMachines: MachineResponse[] = [];
    listMachine: MachineRequest[] = [];
    displayedColumns = ['name', 'status', 'lastMaintenance'];

    constructor(
        private machineService: MachineService,
        private dialog: MatDialog
    ) { }

    getStatusDescription(status: StatusMachineEnum): string {
        return StatusMachineEnumDescriptions[status];
    }

    ngOnInit() {
        this.getMachines();
    }

    getMachines() {
        this.machineService.getMachines().subscribe({
            next: (value) => {
                this.listMachines = value;
            },
            error: (err) => {
                return;
            },
        })
    }

    deleteMachine(machine: MachineResponse) {
        const id = machine.id;
        this.machineService.deleteMachine(id).subscribe({
            next: _ => {
                this.getMachines();
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
                this.getMachines();
            },
            error: err => { }
        });
    }
}
