import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service"

export const authGuard = () => {
    const loginService = inject(LoginService);
    const router = inject(Router);

    if(loginService.token) {
        return true;
    } else {
        router.navigate(['login']);
        return false;
    }
}
