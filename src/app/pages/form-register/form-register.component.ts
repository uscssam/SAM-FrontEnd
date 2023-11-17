import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Option } from 'src/app/interfaces/option';
import { UserService } from 'src/app/services/user.service';
import { Constants } from 'src/app/shared/constants';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {

  formUser: FormGroup = new FormGroup({});
  levels: Option[] = Constants.Levels;
  specialities: Option[] = Constants.Specialities;
  message: string = '';
  error: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.formUser = this.formBuilder.group({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      fullname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      level: new FormControl(null, [Validators.required]),
      speciality: new FormControl(null)
    });
  }

  registerUserButton() {
    let requestBody = this.formUser.value;
    requestBody.level = Number(requestBody.level);
    requestBody.speciality = requestBody.speciality && Number(requestBody.speciality);
    this.userService.createUser(requestBody).subscribe({
      next: _ => {
        this.message = 'Cadastro realizado com sucesso!';
        this.location.back();
      },
      error: _ => {
        this.error = true;
        this.message = 'Desculpe. Falha ao cadastrar, tente novamente mais tarde.';
      }
    })
  }

  cancel() {
    this.location.back();
  }

}
