import {Component, OnInit} from '@angular/core';
import {AppService} from "../../services/app-service";
import {ActivatedRoute} from "@angular/router";
import {AngularFire} from "angularfire2";
import {isNullOrUndefined} from "util";

@Component({
    selector: 'app-parking-details',
    templateUrl: './parking-details.component.html'
})
export class ParkingDetailsComponent implements OnInit {

    slods: Array<any>;
    parking$: any;
    parkingId: string;
    selectedSlot :any= {
        locationNum: '',
        slotInd: ''
    };
    showLoader = true;
    slotLink: any;
    userAuth: any;
    selectedSlotKey: any;
    parkingObj = {
        parkingDate: new Date(),
        startTime: "",
        parkingHrs: "",
    };
    feedbackMsg = "";
    feedbackRef:any;
    myRes:any;

    constructor(private af: AngularFire, private appService: AppService, private route: ActivatedRoute) {
        this.slotLink = this.appService.getSlotObs();
        this.feedbackRef = this.af.database.list("feedbacks")

    }

    ngOnInit() {
        if (this.route.snapshot.params['id']) {
            this.parkingId = this.route.snapshot.params['id'];
            this.userAuth = this.appService.getUserData();
            this.parking$ = this.appService.findParkingById(this.parkingId);
            this.appService.findAllParkingSlod(this.parkingId)
                .do(console.log)
                .subscribe(slods => {
                    this.slods = slods;
                    this.showLoader = false
                    let myRes = [];
                    let uAuth = this.userAuth;
                    this.slods.forEach(function (s) {
                        if(s.bookBy == uAuth.$key){
                            console.log(s.bookBy);
                            myRes.push(s)
                        }
                    });
                    this.myRes = myRes
                });

        }

}


    selectSlot(slotObj, ind) {
        debugger;
        if(this.selectedSlot.slotInd){
            let ind = this.selectedSlot.slotInd;
            this.slods = this.slods.map(function (slod,ind) {
                if(ind == ind){
                    slod.selectable = false;
                }
                return slod;
            })
        }
        this.selectedSlotKey = slotObj.$key;
        slotObj.selectable = !slotObj.selectable;
        if (slotObj.bookBy == "") {
            this.selectedSlot = {
                slotInd: ind
            };
        }
        else {
            this.selectedSlot = {
                locationNum: "",
                slotInd: ""
            };
            alert("Slot is already taken");
        }

    }

    saveReservation() {
        if ((this.selectedSlot.locationNum != "" || this.selectedSlot.locationNum == 0) && this.parkingObj.parkingDate != null &&
            this.parkingObj.startTime.trim() != "" && this.parkingObj.parkingHrs.trim() != "") {

            console.log(this.parkingObj);
            this.slotLink.update(this.selectedSlotKey, {
                bookBy: this.userAuth.$key,
                parkingDate: this.parkingObj.parkingDate,
                parkingHrs: this.parkingObj.parkingHrs,
                startTime: this.parkingObj.startTime
            }).then(data => {
                console.log(data);
                this.parkingObj = {
                    parkingDate: new Date(),
                    startTime: "",
                    parkingHrs: "",
                };
                alert("update")
            }, err => {
                alert(err.message)
            });

        }
        else {
            alert("Please fill all fields");
        }
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

    sendFeedback(){
        if(this.feedbackMsg != "") {
            this.feedbackRef.push({message: this.feedbackMsg})
                .then(data=>{
                    this.feedbackMsg = "";
                    alert("Thanks for the Feedback");
                }, err=>{
                    alert(err.message);
                })
        }
    }

}
