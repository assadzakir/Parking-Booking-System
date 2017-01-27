/**
 * Created by assad on 1/27/17.
 */
import {
        AuthProviders,
        AuthMethods

} from 'angularfire2'
    // Initialize Firebase
export const firebaseConfig = {
        apiKey: "AIzaSyDSlrpfii4HYqi0YtNND3vnpQcCtCLE2iM",
        authDomain: "parking-booking-system-3c8d7.firebaseapp.com",
        databaseURL: "https://parking-booking-system-3c8d7.firebaseio.com",
        storageBucket: "parking-booking-system-3c8d7.appspot.com",
        messagingSenderId: "915092871312"
    };

export const firebaseAuthConfig = {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
}