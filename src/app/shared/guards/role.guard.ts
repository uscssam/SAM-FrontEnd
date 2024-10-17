import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service"
import { Location } from '@angular/common';

export const roleGuard = () => {
    const loginService = inject(LoginService);
    const router = inject(Router);
    const location = inject(Location);

    const url = location.path();

    if(loginService.token) {
        switch(url) {
            case '':
                return false;
            case '/login':
            case '/home':
                return true;
            case '/form-register-user':
            case '/list-users':
            case '/form-register-machine':
                if(loginService.userLevel < 3) {
                    router.navigate(['home']);
                    return false;
                }
                return true;
            case '/list-machines':
                if(loginService.userLevel < 2) {
                    router.navigate(['home']);
                    return false;
                }
                return true;
            default:
                return true;
        }
    } else {
        router.navigate(['login']);
        return false;
    }
}
