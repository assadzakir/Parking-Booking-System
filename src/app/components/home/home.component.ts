import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app-service";
import {AngularFire} from "angularfire2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(public appService:AppService,private af: AngularFire, private router: Router) { }

  ngOnInit() {
  }


  logout(){
    this.appService.logoutUser()
    this.router.navigate(['/'])
  }
}
