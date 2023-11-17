import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Option } from 'src/app/interfaces/option';
import { UserRequest } from 'src/app/interfaces/user-request';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'dialog-edit-user',
  styleUrls: ['./dialog-edit-user.component.scss'],
  templateUrl: 'dialog-edit-user.component.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule, FormsModule, ReactiveFormsModule, CommonModule],
})
export class DialogEditUserComponent implements OnInit {

  formUser: FormGroup = new FormGroup({});
  levels: Option[] = Constants.Levels;
  specialities: Option[] = Constants.Specialities;
  message: string = '';
  error: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: UserRequest
  ) { }

  ngOnInit(): void {
    this.formUser = this.formBuilder.group({
      id: new FormControl(this.data.id),
      userName: new FormControl(this.data.userName, [Validators.required]),
      password: new FormControl(this.data.password),
      fullname: new FormControl(this.data.fullname, [Validators.required]),
      email: new FormControl(this.data.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.data.phone),
      level: new FormControl(this.data.level && this.data.level.toString(), [Validators.required]),
      speciality: new FormControl(this.data.speciality && this.data.speciality.toString())
    });
  }

}