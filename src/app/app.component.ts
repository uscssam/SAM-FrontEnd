import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {


  showNav: boolean = false
  showFiller = false
  
  constructor(
    private route: Router
  ) {
    console.log("construtor")
  }

  ngOnInit(): void {
    
  }
  
  ngAfterViewInit(): void {
    console.log("ViewInit")
    
    this.route.events.subscribe(_ => {
      if (window.location.pathname != '/login') this.showNav = true
      else this.showNav = false
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("OnChanges")
  }

  ngOnDestroy(): void {
    console.log("OnDestroy")
  }

}
