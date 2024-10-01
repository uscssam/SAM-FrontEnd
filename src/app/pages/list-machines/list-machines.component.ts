import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StatusMachineEnum } from 'src/app/enums/status-machine.enum';
import { MachineRequest } from 'src/app/interfaces/machine-request';
import { MachineResponse } from 'src/app/interfaces/machine-response';
import { MachineService } from 'src/app/services/machine.service';
import { DialogEditMachineComponent } from './dialog-edit-machine/dialog-edit-machine.component';
import { HttpClient, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-list-machines',
  templateUrl: './list-machines.component.html',
  styleUrls: ['./list-machines.component.scss']
})

export class ListMachinesComponent implements OnInit {

  listMachines: MachineResponse[] = [];
  listMachine: MachineRequest[] = [];
  displayedColumns = ['name', 'status', 'lastMaintenance', 'preventive'];
  status = StatusMachineEnum;
  
  constructor(
    private machineService: MachineService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getMachines();
  }

  getMachines() {
    this.machineService.getMachines().subscribe({
      next: (value) => {
        this.listMachines = value;
        console.log(value);
      },
      error: (err) => {
        return;
      },
    })
  }

  deleteMachine(index: number) {
    const id = this.listMachines[index].id;
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

  editMachine(index: number) {
    const machine = this.listMachines[index];
    const dialogRef = this.dialog.open(DialogEditMachineComponent, {
      data: machine
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      result && this.okEditMachine(result);
    });
  }

  okEditMachine(machine: MachineRequest) {
    machine.status = Boolean(machine.status);
    this.machineService.updateMachine(machine).subscribe({
      next: _ => {
        this.getMachines();
      },
      error: err => {}
    });
  }
}
