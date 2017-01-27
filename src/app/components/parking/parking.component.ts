import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app-service";

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html'
})
export class ParkingComponent implements OnInit {

  parking$:any;
  showLoader = true;

  constructor(private fb: AppService) { }

  ngOnInit() {
    this.parking$ = this.fb.findAllParking();
    if(this.parking$){
      this.showLoader = false
    }

    console.log(this.parking$)
  }



}
