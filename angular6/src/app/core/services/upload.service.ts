import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { map } from 'rxjs/operators/map';

@Injectable()
export class UploadService {
	constructor (
		private apiService: ApiService
	) {}

	saveVideo(video): Observable<any> {
		console.log(video);
		return this.apiService.post('/upload',{video:video})
			.pipe(map(data => data));
	}

}
