import { HttpClient } from "@angular/common/http";
import { Subject, Observable, Subscription } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class Utility {
    public langDataSource = new BehaviorSubject('en');
    langValue = this.langDataSource.asObservable();

    // below variable keeps the current logged in user details
    public userDataSource = new BehaviorSubject(null);
    userValue = this.userDataSource.asObservable();

    constructor(
        private _http: HttpClient,
        public jwtHelper: JwtHelperService
    ) {
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('jwt');
        // Check whether the token is expired and return
        // true or false
        return !this.jwtHelper.isTokenExpired(token);
    }

    //update the observable value from token
    updateSessionUser(){
        const token = localStorage.getItem('jwt');
        this.userDataSource.next(this.jwtHelper.decodeToken(token));
    }
}