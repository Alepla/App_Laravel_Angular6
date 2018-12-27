import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { ApiService } from "./api.service";
import { User } from "../models";
import { map } from "rxjs/operators/map";
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { JwtService } from './jwt.service';

@Injectable()
export class LoginService {
    private currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());
    
    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

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

    purgeAuth() {
        // Remove JWT from localstorage
        this.jwtService.destroyToken();
        // Set current user to an empty object
        this.currentUserSubject.next({} as User);
        // Set auth status to false
        this.isAuthenticatedSubject.next(false);
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

    getCurrentUser(): User {
        return this.currentUserSubject.value;
    }

    sociallogin(){
        return this.apiService.get('/loginsocial')
            .pipe(map(
            data => {
                this.setAuth(data.user);
                return data;
            }
        ));
    }
    
}