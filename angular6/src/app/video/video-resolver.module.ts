import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Video, VideosService } from '../core';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class VideoResolver implements Resolve<Video> {
	constructor(
		private videosService: VideosService,
		private router: Router
	) {}

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<any> {
		return this.videosService.get(route.params['slug'])
			.pipe(catchError((err) => this.router.navigateByUrl('/')));
	}
}
