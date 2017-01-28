import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app-service";
import {AngularFire} from "angularfire2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  admin = false;
  userAuth:any;
  constructor(public appService:AppService,private af: AngularFire, private router: Router) {
    // this.userAuth = this.appService.getUserData();
  }

  ngOnInit() {
    // this.af.database.object("/users/"+this.userAuth.$key)
    //     .subscribe(data=>{
    //       if(data.role =="user"){
    //         this.admin = false;
    //       }
    //       else{
    //         this.admin = true;
    //       }
    //     });
  }


  logout(){
    this.appService.logoutUser()
    this.router.navigate(['/'])
  }
}
