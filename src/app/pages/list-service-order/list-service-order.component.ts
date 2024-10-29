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
import { UserRequest } from 'src/app/interfaces/user-request';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-list-service-order',
  templateUrl: './list-service-order.component.html',
  styleUrls: ['./list-service-order.component.scss']
})
export class ListServiceOrderComponent implements OnInit {

  isLoadingResults = true;
  listOrders: OrderList[] = [];
  listMachines: MachineResponse[] = [];
  listTechnicians: UserResponse[] = [];
  listUnits: UnitResponse[] = [];
  displayedColumns = ['description', 'status', 'opening', 'closed', 'machine', 'technician', 'unit', 'action'];
  title: string = 'Ordens em aberto';
  orderServiceStatus?: StatusOrderServiceEnum;
  level: ProfileLevelEnum;
  idUser: number;

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
    private userService: UserService,
    private machineService: MachineService,
    private unitService: UnitService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.loginService.onTokenData.subscribe(resp => {
      if (resp && resp.role) {
        this.level = ProfileLevelEnum[resp.role as unknown as keyof typeof ProfileLevelEnum];
        this.idUser = Number(resp.idUser);
      }
    });

  }

  getStatusDescription(status: StatusOrderServiceEnum): string {
    return StatusOrderServiceEnumDescriptions[status] || '-';
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const status = params.get('orderServiceStatus');
      this.orderServiceStatus = status ? Number(status) : undefined;
      this.displayedColumns = ['description', 'status', 'opening', 'machine', 'unit'];
      switch (this.orderServiceStatus) {
        case StatusOrderServiceEnum.Open:
          this.title = 'Ordens em aberto';
          break;
        case StatusOrderServiceEnum.InProgress:
          this.title = 'Ordens em andamento';
          break;
        case StatusOrderServiceEnum.Completed:
          this.title = 'Ordens finalizadas';
          break;
        default:
          this.orderServiceStatus = undefined;
          this.title = 'Minhas Ordens de Serviço';
          break;
      }
      if (this.level > 1) {
        this.displayedColumns.push('action');
      }
    });

    this.getLists();
  }

  getLists() {
    forkJoin([
      this.getMachine(),
      this.getTechnician(),
      this.getUnits()
    ]).subscribe(resp => {
      this.listMachines = resp[0];
      this.listTechnicians = resp[1];
      this.listUnits = resp[2];
      this.getOrders();
    });
  }

  getMachine() {
    var machines = this.machineService.getAll();
    return machines;
  }

  getTechnician() {
    var request: UserRequest = { level: ProfileLevelEnum.Technician };
    return this.userService.search(request);
  }

  getUnits() {
    return this.unitService.getAll();
  }

  getOrders() {
    var orderRequest: OrderRequest = {};
    if (this.orderServiceStatus != undefined) {
      orderRequest = { status: this.orderServiceStatus };
    }
    else if (this.orderServiceStatus == undefined && this.level == ProfileLevelEnum.Technician) {
      orderRequest = { idTechnician: this.loginService.idUser, status: -4 };
    }
    this.isLoadingResults = true;
    this.orderService.search(orderRequest).subscribe({
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
              technician: this.listTechnicians.find(technician => technician.id == item.idTechnician)?.fullname ?? ''
            }
          });
          this.isLoadingResults = false;
          if (this.listOrders.length == 0) {
            Swal.fire({
              icon: 'info',
              text: 'Não há ordens de serviço para exibir.',
              confirmButtonText: 'Ok'
            }).then(() => {
              this.router.navigate(['/home']);
            });
          }
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
        Swal.fire({
          icon: 'success',
          text: 'Ordem de serviço excluída com sucesso!',
          confirmButtonText: 'Ok'
        }).then(() => {
          this.getLists();
        });
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
        Swal.fire({
          icon: 'success',
          text: 'Ordem de serviço atribuída com sucesso!',
          confirmButtonText: 'Ok'
        }).then(() => {
          this.getLists();
        });
      },
      error: err => { }
    });
  }

  take(order: OrderResponse) {
    Swal.fire({
      text: `Deseja assumir a ordem de serviço nº ${order.id} ?`,
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
      allowOutsideClick: false,
    }).then(result => {
      if (result.isConfirmed) {
        var request: OrderRequest = { id: order.id, idTechnician: this.idUser };
        this.orderService.updateOrder(request).subscribe({
          next: _ => {
            Swal.fire({
              text: `Ordem de serviço nº ${order.id} atribuída com sucesso!`,
              icon: 'success',
              confirmButtonText: 'OK',
              allowOutsideClick: false,
            }).then(() => {
              this.getLists();
            });
          },
          error: err => {
            console.log(err);
          }
        });
      }
    });
  }

  block(order: OrderResponse) {
    Swal.fire({
      text: `Deseja bloquear a ordem de serviço nº ${order.id} ?`,
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
      allowOutsideClick: false,
    }).then(result => {
      if (result.isConfirmed) {
        var request: OrderRequest = { id: order.id, status: StatusOrderServiceEnum.Impeded };
        this.orderService.updateOrder(request).subscribe({
          next: _ => {
            this.getLists();
            Swal.fire({
              text: `Ordem de serviço nº ${order.id} bloqueada com sucesso!`,
              icon: 'success',
              confirmButtonText: 'OK',
              allowOutsideClick: false,
            }).then(() => {
              this.getLists();
            });
          },
          error: err => {
            console.log(err);
          }
        });
      }
    });
  }

  unblock(order: OrderResponse) {
    Swal.fire({
      text: `Deseja desbloquear a ordem de serviço nº ${order.id} ?`,
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
      allowOutsideClick: false,
    }).then(result => {
      if (result.isConfirmed) {
        var request: OrderRequest = { id: order.id, status: StatusOrderServiceEnum.InProgress };
        this.orderService.updateOrder(request).subscribe({
          next: _ => {
            this.getLists();
            Swal.fire({
              text: `Ordem de serviço nº ${order.id} desbloqueada com sucesso!`,
              icon: 'success',
              confirmButtonText: 'OK',
              allowOutsideClick: false,
            }).then(() => {
              this.getLists();
            });
          },
          error: err => {
            console.log(err);
          }
        });
      }
    });

  }

  close(order: OrderResponse) {
    Swal.fire({
      text: `Deseja encerrar a ordem de serviço nº ${order.id} ?`,
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: 'Não',
      allowOutsideClick: false,
    }).then(result => {
      if (result.isConfirmed) {
        var request: OrderRequest = { id: order.id, status: StatusOrderServiceEnum.Completed };
        this.orderService.updateOrder(request).subscribe({
          next: _ => {
            this.getLists();
            Swal.fire({
              text: `Ordem de serviço nº ${order.id} encerrada com sucesso!`,
              icon: 'success',
              confirmButtonText: 'OK',
              allowOutsideClick: false,
            }).then(() => {
              this.getLists();
            });
          },
          error: err => {
            console.log(err);
          }
        });
      }
    });
  }
}
