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
import { DialogEditMachineComponent } from '../list-machines/dialog-edit-machine/dialog-edit-machine.component';

@Component({
  selector: 'app-list-service-order',
  templateUrl: './list-service-order.component.html',
  styleUrls: ['./list-service-order.component.css']
})
export class ListServiceOrderComponent implements OnInit {

  listOrders: OrderList[] = [];
  listMachines: MachineResponse[] = [];
  listTechnicians: UserResponse[] = [];
  displayedColumns = ['description', 'status', 'opening', 'closed', 'machine', 'technician', 'action'];

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    private userService: UserService,
    private machineService: MachineService
  ) { }

  getStatusDescription(status: StatusOrderServiceEnum): string {
    return StatusOrderServiceEnumDescriptions[status] || '-';
  }

  ngOnInit() {
    forkJoin(
      this.getMachine(),
      this.getTechnician()
    ).subscribe(resp => {
      this.listMachines = resp[0];
      this.listTechnicians = resp[1].filter(item => item.level == ProfileLevelEnum.Technician);
      this.getOrders();
    })
  }

  getMachine() {
    return this.machineService.getAll();
  }

  getTechnician() {
    return this.userService.getAll();
  }

  getOrders() {
    this.orderService.getOrders().subscribe({
      next: (value) => {
        this.listOrders = value.map(item => {
          return <OrderList>{
            ...item,
            machine: this.listMachines.find(machine => machine.id == item.idMachine)?.name,
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
        this.getOrders();
        alert('Máquina deletada com sucesso!')
      },
      error: err => {
        console.log(err);
      }
    });
  }

  edit(order: OrderResponse) {
    const dialogRef = this.dialog.open(DialogEditMachineComponent, {
      data: order
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      result && this.okEdit(result);
    });
  }

  okEdit(order: OrderRequest) {
    order.status = order.status;
    this.orderService.update(order).subscribe({
      next: _ => {
        this.getOrders();
      },
      error: err => { }
    });
  }
}

