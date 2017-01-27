/**
 * Created by assad on 1/27/17.
 */
import {Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {HomeComponent} from "./components/home/home.component";
import {AdminComponent} from "./components/admin/admin.component";
import {ParkingComponent} from "./components/parking/parking.component";
import {ParkingDetailsComponent} from "./components/parking-details/parking-details.component";




export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    },
    {
        path: 'parking',
        component: ParkingComponent
    },
    {path: 'parking/:id', children: [
        {path: '', component: ParkingDetailsComponent},
    ]},
];

