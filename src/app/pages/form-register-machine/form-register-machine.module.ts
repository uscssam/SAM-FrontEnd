import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRegisterMachineRoutingModule } from './form-register-machine-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormRegisterMachineComponent } from './form-register-machine.component';


@NgModule({
  declarations: [
    FormRegisterMachineComponent
  ],
  imports: [
    CommonModule,
    FormRegisterMachineRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class FormRegisterMachineModule { }
