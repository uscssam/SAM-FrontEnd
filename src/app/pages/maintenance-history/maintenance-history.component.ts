import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { ProfileLevelEnum } from 'src/app/enums/profile-level.enum';
import { StatusOrderServiceEnum, StatusOrderServiceEnumDescriptions } from 'src/app/enums/status-order-service.enum';
import { MachineResponse } from 'src/app/interfaces/machine-response';
import { OrderList } from 'src/app/interfaces/order-list';
import { OrderRequest } from 'src/app/interfaces/order-request';
import { UserResponse } from 'src/app/interfaces/user-response';
import { LoginService } from 'src/app/services/login.service';
import { MachineService } from 'src/app/services/machine.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-maintenance-history',
  templateUrl: './maintenance-history.component.html',
  styleUrls: ['./maintenance-history.component.scss']
})
export class MaintenanceHistoryComponent implements OnInit, AfterViewInit {

  isLoadingResults = true;
  hasError = false;
  resultsLength = 0;
  dataSource: MatTableDataSource<OrderList>;
  listMachines: MachineResponse[] = [];
  listTechnicians: UserResponse[] = [];
  displayedColumns = ['description', 'status', 'opening', 'closed', 'machine', 'technician'];
  level: ProfileLevelEnum;
  idUser: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private machineService: MachineService,
    private loginService: LoginService
  ) {
    this.level = loginService.userLevel;
    this.idUser = loginService.idUser;
  }

  getStatusDescription(status: StatusOrderServiceEnum): string {
    return StatusOrderServiceEnumDescriptions[status] || '-';
  }

  ngOnInit() {
    forkJoin([
      this.getMachine(),
      this.getTechnician()
    ]).subscribe(resp => {
      this.listMachines = resp[0];
      this.listTechnicians = resp[1].filter(item => item.level == ProfileLevelEnum.Technician);
      this.getOrders();
    })
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe((sortChange) => {
      console.log(sortChange);
    });
  }

  getMachine() {
    return this.machineService.getMachines();
  }

  getTechnician() {
    return this.userService.getAll();
  }

  getOrders() {
    this.hasError = false;
    var orderRequest: OrderRequest = { status: StatusOrderServiceEnum.Completed };
    if(this.level == ProfileLevelEnum.Technician) {
      orderRequest.idTechnician = this.idUser;
    }
    this.orderService.search(orderRequest)
    .subscribe({
      next: (value) => {
        this.dataSource = new MatTableDataSource(value
          .filter(item => Number(item.status) == StatusOrderServiceEnum.Completed)
          .map(item => {
            this.isLoadingResults = false;
            return <OrderList>{
              ...item,
              status: StatusOrderServiceEnumDescriptions[Number(item.status)],
              closed: item.closed || '-',
              machine: this.listMachines.find(machine => machine.id == item.idMachine)?.name,
              technician: this.listTechnicians.find(technician => technician.id == item.idTechnician)?.fullname
            }
        }));

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.resultsLength = value.length;
      },
      error: (err) => {
        this.hasError = true;
        return;
      },
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
