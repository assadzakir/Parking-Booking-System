import { Component, OnInit } from '@angular/core';
import {AngularFire} from "angularfire2";
import {Router} from "@angular/router";
import {AppService} from "../../services/app-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  userObj = {email: "", password: ""};
  afRef : any;
  userAuth;
  router;
  userService;
  admin:boolean
  constructor(private af: AngularFire, private _router: Router, private _userService: AppService){
    this.afRef = af;
    this.router = _router;
    this.userService = _userService;
  }
  loginUser(){
    console.log(this.userObj);
    if(this.userObj.email.trim() !="" && this.userObj.password.trim() !="")
      this.afRef.auth.login({ email: this.userObj.email, password: this.userObj.password })
          .then(auth => {
            console.log(auth);
            this.afRef.database.object("/users/"+auth.uid)
                .subscribe(data=>{
                  this.userService.setUserData(data);
                  this.userAuth = data;
                  if(data.role =="user"){
                      this.admin = false;
                    this.router.navigate(["/parking"]);
                  }
                  else{
                      this.admin = true;
                    this.router.navigate(["/admin"])
                  }
                });

          }, function (err) {
            console.log(err);
            alert(err.message);
          });
  }
}
