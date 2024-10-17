import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { LoginService } from './services/login.service';
import { UserClaim } from './interfaces/user-claim';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  showNav: boolean = false;
  userClaim?: UserClaim;
  isHomeRoute: boolean = false;

  constructor(
    private route: Router,
    private loginService: LoginService,
    private location: Location
  ) {}

  ngOnInit() {
    this.loginService.onTokenData.subscribe(resp => this.userClaim = resp)
    this.route.events.pipe(
      filter((event: NavigationEvent): event is NavigationStart => event instanceof NavigationStart)
    ).subscribe((event: NavigationStart) => {
      this.isHomeRoute = event.url === '/home';
    });
  }

  ngAfterViewInit(): void {
    this.route.events.subscribe(_ => {
      if (window.location.pathname != '/login') this.showNav = true
      else this.showNav = false
    })
  }

  goBack() {
    this.location.back();
  }

}
