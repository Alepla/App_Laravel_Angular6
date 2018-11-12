import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { Contact } from '../models';
import { map } from 'rxjs/operators/map';

@Injectable()
export class ContactService {
    constructor (
        private apiService: ApiService
    ) {}

    send(contactMail): Observable <Contact> {
        console.log(contactMail);
        return this.apiService.post('/sendemail/', {contactMail: contactMail})
        .pipe(map(
            data => data.message,
            err => {
                console.log(err);
            }
        ));
    }
}