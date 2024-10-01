import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormRegisterUserRoutingModule } from './form-register-user-routing.module';
import { FormRegisterUserComponent } from './form-register-user.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    FormRegisterUserComponent
  ],
  imports: [
    CommonModule,
    FormRegisterUserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class FormRegisterUserModule { }
