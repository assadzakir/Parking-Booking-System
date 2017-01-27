import {Component, OnInit} from '@angular/core';
import {AppService} from "../../services/app-service";
import {ActivatedRoute} from "@angular/router";
import {AngularFire} from "angularfire2";

@Component({
    selector: 'app-parking-details',
    templateUrl: './parking-details.component.html'
})
export class ParkingDetailsComponent implements OnInit {

    slods: any;
    parking$: any;
    parkingId: string;
    selectedSlot: any;
    showLoader = true;
    slotLink: any;
    userAuth: any;
    selectedSlotKey: any;
    parkingObj = {
        parkingDate: new Date(),
        startTime: "",
        parkingHrs: "",
    };
    myReservedParkingList: any;

    constructor(private af: AngularFire, private appService: AppService, private route: ActivatedRoute) {
        this.slotLink = this.appService.getSlotObs();
        this.userAuth = this.appService.getUserData();
    }

    ngOnInit() {
        if (this.route.snapshot.params['id']) {
            this.parkingId = this.route.snapshot.params['id'];
            this.parking$ = this.appService.findParkingById(this.parkingId);
            this.appService.findAllParkingSlod(this.parkingId)
                .do(console.log)
                .subscribe(slods => {
                    this.slods = slods;
                    this.showLoader = false
                });
        }
    }

    selectSlot(slotObj, ind) {
        this.selectedSlotKey = slotObj.$key;
        slotObj.selectable = "true";
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
                parkingData: this.parkingObj.parkingDate,
                parkingHrs: this.parkingObj.parkingHrs,
                startTime: this.parkingObj.startTime
            }).then(data => {
                console.log(data);
                this.parkingObj = {
                    parkingDate: new Date(),
                    startTime: "",
                    parkingHrs: "",
                };
                alert("parking saved successfully")
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
        this.slotLink.update(this.selectedSlotKey, {
            bookedBy: "",
            parkingData: "",
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
