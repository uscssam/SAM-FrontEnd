import { Component } from '@angular/core';
import { ProfileLevelEnum } from 'src/app/enums/profile-level.enum';
import { LoginService } from 'src/app/services/login.service';
import { Constants } from 'src/app/shared/constants';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    level!: ProfileLevelEnum;

    constructor(
        private loginService: LoginService
    ) {
        this.loginService.onTokenData.subscribe(resp => {
            if (resp && resp.role) {
                this.level = ProfileLevelEnum[resp.role as unknown as keyof typeof ProfileLevelEnum];
            }
    });
    }
}
