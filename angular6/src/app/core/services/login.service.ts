import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ApiService } from "./api.service";
import { User } from "../models";
import { map } from "rxjs/operators/map";
import { JwtService } from './jwt.service';

@Injectable()
export class LoginService {
    private currentUserSubject = new BehaviorSubject<User>({} as User);
    private email:String;
    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    constructor(
        private apiService: ApiService,
        private jwtService: JwtService
    ){}

    setAuth(user: User) {
        // Save JWT sent from server in localstorage
        this.jwtService.saveToken(user.token);
        // Set current user data into observable
        this.currentUserSubject.next(user);
        // Set auth status to false
        this.isAuthenticatedSubject.next(true);
    }
    
    attemptLogin(type,data): Observable<User> {
        const route = (type === 'login') ? '/login' : '';
        return this.apiService.post('/users' + route, {user: data})
            .pipe(map(
            data => {
                this.setAuth(data.user);
                return data;
            }
        ));
    }

    sociallogin(email){
        return this.apiService.get('/loginsocial?email='+email)
            .pipe(map(
            data => {
                console.log("User",data)
                this.setAuth(data.user);
                return data;
            }
        ));
    }
    
}