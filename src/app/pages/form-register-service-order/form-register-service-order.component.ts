import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileLevelEnum } from 'src/app/enums/profile-level.enum';
import { Option } from 'src/app/interfaces/option';
import { MachineService } from 'src/app/services/machine.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Constants } from 'src/app/shared/constants';
import { MachineRequest } from 'src/app/interfaces/machine-request';
import { StatusMachineEnum } from 'src/app/enums/status-machine.enum';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-register-service-order',
  templateUrl: './form-register-service-order.component.html',
  styleUrls: ['./form-register-service-order.component.scss']
})
export class FormRegisterServiceOrderComponent implements OnInit {

  formOrderService: FormGroup = new FormGroup({});
  statusOrder: Option[] = Constants.StatusOrderService;
  machines: any[] = [];
  technicians: any[] = [];
  message: string = '';
  error: boolean = false;
  level: ProfileLevelEnum;

  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private machineService: MachineService,
    private userService: UserService,
    private orderService: OrderService,
    private loginService: LoginService
  ) {
    this.loginService.onTokenData.subscribe(resp => {
      if (resp && resp.role) {
        this.level = ProfileLevelEnum[resp.role as unknown as keyof typeof ProfileLevelEnum];
      }
    });
  }

  ngOnInit(): void {
    var machineRequest: MachineRequest = { status: StatusMachineEnum.Active };
    this.machineService.search(machineRequest)
      .subscribe(machines => {

        if (machines.length == 0) {
          Swal.fire({
            icon: 'info',
            text: 'Não há máquinas disponíveis para realizar o cadastro de ordem de serviço.',
          }).then(() => {
            this.location.back();
          }
          );
        }

        this.machines = machines
      });

    this.userService.getUsers()
      .subscribe(users => this.technicians = users.filter(user => user.level == ProfileLevelEnum.Technician))

    this.formOrderService = this.formBuilder.group({
      description: new FormControl(null, [Validators.required]),
      idMachine: new FormControl(null, [Validators.required]),
      idTechnician: new FormControl(null, []),
    });

  }

  registerOrderService() {
    if (this.formOrderService.invalid) return;

    let requestBody = this.formOrderService.value;
    requestBody.status = Number(requestBody.status);

    this.orderService.createOrder(requestBody).subscribe({
      next: _ => {
        this.message = 'Cadastro de ordem realizado com sucesso!';
        this.location.back();
      },
      error: _ => {
        this.error = true;
        this.message = 'Desculpe. Falha ao cadastrar ordem, tente novamente mais tarde.';
      }
    })
  }

  cancel() {
    this.location.back();
  }

}
