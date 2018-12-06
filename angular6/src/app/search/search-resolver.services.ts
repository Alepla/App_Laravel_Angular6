import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Video, SearchService } from '../core';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class SearchResolver implements Resolve<Video> {
	constructor(
		private searchService: SearchService,
		private router: Router
	) {}

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<any> {
		return this.searchService.get(route.params['filter'])
			.pipe(catchError((err) => this.router.navigateByUrl('/')));
	}
}
