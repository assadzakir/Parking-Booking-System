import { Component, OnInit } from '@angular/core';
import {AngularFire} from "angularfire2";
import {AppService} from "../../services/app-service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  selectedSlot :any= {
    locationNum: '',
    slotInd: ''
  };
  showLoader = true;
  slotLink: any;
  parkingObj = {
    parkingDate: new Date(),
    startTime: "",
    parkingHrs: "",
  };
  feedbackRef:any;
  feedbackMsgList:any;
  allSlots:any;
  bookedSlods:any;
  allUsersListRef:any;
  allUsersList:any;

  constructor(private af: AngularFire, private appService: AppService, private route: ActivatedRoute) {
    this.slotLink = this.af.database.list("slot");
    this.feedbackRef = this.af.database.list("feedbacks");
    this.allUsersListRef = this.af.database.list("/users")
    this.allUsersListRef.subscribe(users=>{
      this.allUsersList = users;
    });
    this.feedbackRef.subscribe(feeds=>{
      this.feedbackMsgList = feeds;
    });
    this.slotLink.subscribe(slots=>{
      this.allSlots = slots;
      let myRes = [];
      this.allSlots.forEach(function (s) {
        if(s.bookBy != ""){
          console.log(s.bookBy);
          myRes.push(s)
        }
      });
      this.bookedSlods = myRes;
    });
  };

  ngOnInit() {

  }

  deleteUser(userObj){
    if(userObj.$key)
      this.allUsersListRef.remove(userObj.$key);
  }
  cancelReservation(slotObj) {
    console.log(slotObj);
    this.slotLink.update(slotObj.$key, {
      bookBy: "",
      parkingDate: "",
      parkingHrs: "",
      startTime: "",

    }).then(data => {
      console.log(data);
      alert("reservation canceled successfully")
    }, err => {
      alert(err.message)
    });
  }


}
