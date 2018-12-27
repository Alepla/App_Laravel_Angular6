import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { Video } from '../models';
import { map } from 'rxjs/operators/map';

@Injectable()
export class SearchService {
    constructor (
        private apiService: ApiService
    ) {}
    
    get(filter): Observable<any> {
        return this.apiService.get('/search?filter=' + filter)
          .pipe(map(data => data));
    }

    getAutoFilter(filter): Observable<any> {
        return this.apiService.get('/searchautofilter?filter=' + filter)
          .pipe(map(data => data));
    }
}
