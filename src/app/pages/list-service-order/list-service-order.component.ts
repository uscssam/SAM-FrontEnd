import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { ProfileLevelEnum } from 'src/app/enums/profile-level.enum';
import { StatusOrderServiceEnum, StatusOrderServiceEnumDescriptions } from 'src/app/enums/status-order-service.enum';
import { MachineResponse } from 'src/app/interfaces/machine-response';
import { OrderList } from 'src/app/interfaces/order-list';
import { OrderRequest } from 'src/app/interfaces/order-request';
import { OrderResponse } from 'src/app/interfaces/order-response';
import { UserResponse } from 'src/app/interfaces/user-response';
import { MachineService } from 'src/app/services/machine.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { DialogEditOrderComponent } from './dialog-edit-order/dialog-edit-order.component';
import { UnitService } from 'src/app/services/unit.service';
import { UnitResponse } from 'src/app/interfaces/unit-response';

@Component({
  selector: 'app-list-service-order',
  templateUrl: './list-service-order.component.html',
  styleUrls: ['./list-service-order.component.scss']
})
export class ListServiceOrderComponent implements OnInit {

  listOrders: OrderList[] = [];
  listMachines: MachineResponse[] = [];
  listTechnicians: UserResponse[] = [];
  listUnits: UnitResponse[] = [];
  displayedColumns = ['description', 'status', 'opening', 'closed', 'machine', 'technician','unit','action'];

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    private userService: UserService,
    private machineService: MachineService,
    private unitService: UnitService
  ) { }

  getStatusDescription(status: StatusOrderServiceEnum): string {
    return StatusOrderServiceEnumDescriptions[status] || '-';
  }

  ngOnInit() {
    this.getLists();
  }

  getLists() {
    forkJoin(
      this.getMachine(),
      this.getTechnician(),
      this.getUnits()
    ).subscribe(resp => {
      this.listMachines = resp[0];
      this.listTechnicians = resp[1].filter(item => item.level == ProfileLevelEnum.Technician);
      this.listUnits = resp[2];
      this.getOrders();
    });
  }

  getMachine() {
    return this.machineService.getAll();
  }

  getTechnician() {
    return this.userService.getAll();
  }

  getUnits(){
    return this.unitService.getAll();
  }

  getOrders() {
    this.orderService.getOrders().subscribe({
      next: (value) => {
        this.listOrders = value
        .filter(item => Number(item.status) != StatusOrderServiceEnum.Completed)
        .map(item => {
          const machine = this.listMachines.find(machine => machine.id == item.idMachine);
          return <OrderList>{
            ...item,
            closed: item.closed || '-',
            machine: machine?.name,
            unit: this.listUnits.find(unit => machine?.idUnit == unit.id)?.name,
            technician: this.listTechnicians.find(technician => technician.id == item.idTechnician)?.fullname
          }
        });
      },
      error: (err) => {
        return;
      },
    })
  }

  delete(item: OrderResponse) {
    const id = item.id;
    this.orderService.deleteOrder(id).subscribe({
      next: _ => {
        this.getLists();
        alert('Ordem deletada com sucesso!')
      },
      error: err => {
        console.log(err);
      }
    });
  }

  edit(order: OrderResponse) {
    const dialogRef = this.dialog.open(DialogEditOrderComponent, {
      data: {
        order,
        machines: this.listMachines,
        technicians: this.listTechnicians,
      },
      
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      result && this.okEdit(result);
    });
  }

  okEdit(order: OrderRequest) {
    this.orderService.update(order).subscribe({
      next: _ => {
        this.getLists();
        alert('Ordem alterada com sucesso!')
      },
      error: err => { }
    });
  }
}

