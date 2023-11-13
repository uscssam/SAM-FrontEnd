import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { UserClaim } from './interfaces/user-claim';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  showNav: boolean = false;
  userClaim?: UserClaim;
  
  constructor(
    private route: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.loginService.onTokenData.subscribe(resp => this.userClaim = resp)
  }

  ngAfterViewInit(): void {
    this.route.events.subscribe(_ => {
      if (window.location.pathname != '/login') this.showNav = true
      else this.showNav = false
    })
  }

}
