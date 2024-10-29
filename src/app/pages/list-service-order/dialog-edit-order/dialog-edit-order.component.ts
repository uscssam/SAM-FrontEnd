import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MachineResponse } from 'src/app/interfaces/machine-response';
import { Option } from 'src/app/interfaces/option';
import { UserResponse } from 'src/app/interfaces/user-response';
import { LoginService } from 'src/app/services/login.service';
import { Constants } from 'src/app/shared/constants';

@Component({
    selector: 'dialog-edit-order',
    styleUrls: ['./dialog-edit-order.component.scss'],
    templateUrl: 'dialog-edit-order.component.html',
    standalone: true,
    imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, FormsModule, ReactiveFormsModule, CommonModule],
})
export class DialogEditOrderComponent implements OnInit {

    formOrderService: FormGroup = new FormGroup({});
    statusOrder: Option[] = Constants.StatusOrderService;
    idUser?: string;
    machines: MachineResponse[] = [];
    technicians: UserResponse[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        @Inject(MAT_DIALOG_DATA) protected data: any,

    ) {
      this.machines = data.machines;
      this.technicians = data.technicians;
      this.loginService.onTokenData.subscribe(resp => {
        this.idUser = resp?.idUser;
      });
    }

  ngOnInit(): void {
    this.formOrderService = this.formBuilder.group({
      id: new FormControl(this.data.order.id, []),
      idTechnician: new FormControl(this.data.order.idTechnician, [Validators.required]),
    });
  }
}
