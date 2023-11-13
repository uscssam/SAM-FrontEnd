import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/interfaces/login-request';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formLogin = new FormGroup({
    username: new FormControl(undefined, [Validators.required]),
    password: new FormControl(undefined, [Validators.required])
  });

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  login() {
    let dataUser = <LoginRequest>this.formLogin.value;

    this.loginService.loginAuth(dataUser).subscribe({
      next: (value) => {
        console.log('Login realizado com sucesso', value)
        this.router.navigate(['home'])
      },
      error: (err) => {
        console.log('Erro no login', err)
      }
    })
  }
}
