import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { firebaseConfig ,firebaseAuthConfig} from '../environments/firebase.config';
import { AngularFireModule } from 'angularfire2';
import {MaterialModule} from "@angular/material"
import {RouterModule} from "@angular/router";
import {routes} from "./app.routing";

import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { ParkingComponent } from './components/parking/parking.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';



import { AppService } from './services/app-service';
import { ParkingDetailsComponent } from './components/parking-details/parking-details.component';






@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ParkingComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    ParkingDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig,firebaseAuthConfig),
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
      {provide: LocationStrategy, useClass: HashLocationStrategy},
      AppService
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
