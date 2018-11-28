import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators/map';

@Injectable()
export class LabelsService {
    constructor(
        private apiService: ApiService
    ) {}

    getAll(): Observable<[string]> {
        return this.apiService.get('/labels')
            .pipe(map(data => data.labels))
    }

}