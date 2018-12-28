import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { User } from '../models';


@Injectable()
export class SubscribeService {

    constructor (
        private apiService: ApiService
    ) {}

    checkSubscribe(id): Observable<User> {
        return this.apiService.get('/users/subscribe?id='+id);
    }
    subscribe(username): Observable<User> {
        return this.apiService.post('/users/subscribe',{username});
    }

    notsubscribe(username): Observable<User> {
        return this.apiService.delete('/users/subscribe?username='+username);
    }

}
