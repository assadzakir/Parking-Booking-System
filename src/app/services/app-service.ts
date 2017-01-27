/**
 * Created by assad on 1/27/17.
 */
import {Injectable, Inject} from '@angular/core';
import {FirebaseListObservable, AngularFire, FirebaseRef} from "angularfire2";
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable()
export class AppService {
    userObj;
    afRef;
    router;
    parking$: FirebaseListObservable<any>;
    slot$: FirebaseListObservable<any>;
    db: any;

    constructor(private af: AngularFire, _router: Router) {
        this.parking$ = this.af.database.list('parking');
        this.slot$ = this.af.database.list('slot');
        this.afRef = af;
        this.router = _router;
    }

    getDb() {
        this.db = this.af.database;
        return this.db;
    }


    findParkingById(parkingId): Observable<any> {
        return this.getDb().list('parking', {
            query: {
                orderByChild: 'name',
                equalTo: parkingId
            }
        })
            .map((parking) => parking[0]);
    }

    findAllParkingSlod(parkingId) {
        return this.findSlodKeyPreParking(parkingId)
            .do(console.log)
            .map((slodKeys) => slodKeys
                .map((slodKey) => {
                    return this.db.object(`slot/${slodKey.$key}`)
                }))
            .flatMap((res) => {
                return Observable.combineLatest(res);
            });
    }

    findSlodKeyPreParking(parkingId) {
        return this.findParkingById(parkingId)
            .filter(parking => !!parking)
            .map((parking) => parking.$key)
            .switchMap((parkingKey) => this.getDb().list(`slodPerParking/${parkingKey}`, {
                query: {
                    limitToFirst: 4,
                    orderByKey: true
                }
            }));
    }

    findAllParking() {
        return this.parking$;
    }

    setUserData(data) {
        this.userObj = data;
        console.log("saving in service");
        console.log(data, "saving in service");
        localStorage.setItem("userData", JSON.stringify(data));
    }

    getUserData() {
        let userObjTemp = JSON.parse(localStorage.getItem("userData"));
        return this.userObj || userObjTemp;
    }

    logoutUser() {
        this.afRef.auth.logout()
            .then(
                data => {
                    localStorage.removeItem("userData");
                    this.router.navigate(['/login'])
                },
                error => console.log('Error in Logout', error)
            );
    }


    getSlotObs() {
        return this.slot$;
    }


}