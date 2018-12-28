import { Component, OnInit } from '@angular/core';
import { Video, VideosService, UserService, VideoListConfig, User, SubscribeService } from '../core';
import { ActivatedRoute,Router } from '@angular/router';
import { concatMap } from 'rxjs/operators/concatMap';
import { of } from 'rxjs/observable/of';

@Component({
    selector: 'app-article-page',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.css']
})

export class VideoComponent implements OnInit {

    video: Video;
    user: User;
    listConfig: VideoListConfig = {
        type: 'all',
        filters: {},
        paginate: false
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private videoService: VideosService,
        private userService: UserService,
        private subscribeService: SubscribeService
    ) { }

    ngOnInit() {
        this.route.data.subscribe(
        (data: { video: Video }) => {
            this.video = data.video;
            this.user = this.video.creator;

            this.userService.isAuthenticated.subscribe(
                (authenticated) => {
                  // Not authenticated? Push to login screen
                if (!authenticated) {
                    this.user['subscribe'] = false;
                }else{
                    this.subscribeService.checkSubscribe(this.video.creator.id).subscribe(data => {
                        this.user['subscribe'] = data.state;
                        this.user['followers'] = data.followers;
                    });
                }
            });
            
            this.videoService.sumView(this.video).subscribe(data => {
                this.video.views  = data.views;
            });
        });
    }   


    setListTo(type: string = '', filters: Object = {}) {
        // Otherwise, set the list object
        this.listConfig = {type: type, filters: filters, paginate: false};
    }

    onToggleLike(like: boolean) {
        this.video['like'] = like;

        if (like) {
            this.video['likesCount']++;
        } else {
            this.video['likesCount']--;
        }
    }

    onToggleDisLike(dislike: boolean) {
        this.video['dislike'] = dislike;

        if (dislike) {
            this.video['dislikesCount']++;
        } else {
            this.video['dislikesCount']--;
        }
    }

    onToggleSubscribe(subscribe: boolean) {
        this.user['subscribe'] = subscribe;

        if (subscribe) {
            this.user['followers']++;
        } else {
            this.user['followers']--;
        }
    }
}