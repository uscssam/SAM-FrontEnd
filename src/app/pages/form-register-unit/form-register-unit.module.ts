import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormRegisterUnitRoutingModule } from './form-register-unit-routing.module';
import { FormRegisterUnitComponent } from './form-register-unit.component';


@NgModule({
  declarations: [
    FormRegisterUnitComponent
  ],
  imports: [
    CommonModule,
    FormRegisterUnitRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class FormRegisterUnitModule { }
