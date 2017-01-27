import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { firebaseConfig ,firebaseAuthConfig} from '../environments/firebase.config';
import { AngularFireModule } from 'angularfire2';
import {MaterialModule} from "@angular/material"

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig,firebaseAuthConfig),
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
      {provide: LocationStrategy, useClass: HashLocationStrategy}
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
