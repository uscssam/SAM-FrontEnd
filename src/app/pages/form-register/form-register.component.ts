import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Option } from 'src/app/interfaces/option';
import { FormRegisterUserService } from 'src/app/services/form-register-user.service';
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
    private formRegisterUser: FormRegisterUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formUser = this.formBuilder.group({
      userName: new FormControl(null, [Validators.required]),
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
    this.formRegisterUser.registerUser(requestBody).subscribe({
      next: _ => {
        this.message = 'Cadastro realizado com sucesso!';
        this.router.navigate(['home']);
      },
      error: _ => {
        this.error = true;
        this.message = 'Desculpe. Falha ao cadastrar, tente novamente mais tarde.';
      }
    })
  }

}
