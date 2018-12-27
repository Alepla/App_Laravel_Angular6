import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Video, VideosService, UserService } from '../../core';
import { of } from 'rxjs/observable/of';
import { concatMap } from 'rxjs/operators/concatMap';
import { tap } from 'rxjs/operators/tap';

@Component({
  selector: 'app-dislike-button',
  templateUrl: './dislike-button.component.html'
})
export class DisLikeButtonComponent {
  constructor(
    private videosService: VideosService,
    private router: Router,
    private userService: UserService
  ) {}

  @Input() video: Video;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  toggleDisLike() {
    this.isSubmitting = true;

    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        // Not authenticated? Push to login screen
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return of(null);
        }

        // Favorite the video if it isn't liked yet
        if (!this.video.dislike) {
            return this.videosService.dislike(this.video.slug)
            .pipe(tap(
                data => {
                    if(this.video.like) {
                        return this.videosService.notlike(this.video.slug)
                    }
                    this.isSubmitting = false;
                    this.toggle.emit(true);
                },
                err => {
                    this.isSubmitting = false;
                    console.log(err);
                }
            ));

        // Otherwise, disliked the video
        } else {
            return this.videosService.notdislike(this.video.slug)
            .pipe(tap(
                data => {
                this.isSubmitting = false;
                this.toggle.emit(false);
                },
                err => this.isSubmitting = false
            ));
        }

      }
    )).subscribe();
  }
}
