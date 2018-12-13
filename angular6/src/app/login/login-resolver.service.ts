import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoginService } from '../core';
import { catchError } from 'rxjs/operators/catchError';
import { map } from "rxjs/operators/map";

@Injectable()
export class LoginResolver implements Resolve<any> {
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.loginService.sociallogin(route.params['email'])
        .pipe(map(
          data => {window.location.reload(); this.router.navigateByUrl('/')}
        ));
  }
}
