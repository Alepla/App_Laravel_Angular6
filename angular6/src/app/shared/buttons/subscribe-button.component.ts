import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Video, UserService, SubscribeService } from '../../core';
import { of } from 'rxjs/observable/of';
import { concatMap } from 'rxjs/operators/concatMap';
import { tap } from 'rxjs/operators/tap';

@Component({
  selector: 'app-subscribe-button',
  templateUrl: './subscribe-button.component.html'
})
export class SubscribeButtonComponent {
  constructor(
    private router: Router,
    private userService:UserService,
    private subscribeService: SubscribeService
  ) {}

  @Input() user: any;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleSubs() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return of(null);
        }

        // Favorite the video if it isn't liked yet
        if (!this.user.subscribe) {
          return this.subscribeService.subscribe(this.user.username)
          .pipe(tap(
            data => { 
              this.toggle.emit(true);
            },
            err => {
              console.log(err);
            }
          ));

        // Otherwise, disliked the video
        } else {
          return this.subscribeService.notsubscribe(this.user.username)
          .pipe(tap(
            data => {
              this.toggle.emit(false);
            },
            err => this.isSubmitting = false
          ));
        }

      }
    )).subscribe();
  }
}
