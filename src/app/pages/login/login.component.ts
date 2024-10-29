import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/interfaces/login-request';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hide: boolean = false;

  formLogin = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  });

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    sessionStorage.clear();
  }

  hidePassword() {
      this.hide = !this.hide
  }

  login() {
    let dataUser = <LoginRequest>this.formLogin.value;

    this.loginService.loginAuth(dataUser).subscribe({
      next: _ => {
        this.router.navigate(['home']);
      },
      error: (err) => {
        const errorMessage = err?.message || 'Ocorreu um erro inesperado. Por favor tente novamente mais tarde';
        Swal.fire({
          icon: 'error',
          text: errorMessage
        })
      }
    })
  }
}
