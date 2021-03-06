import { Component, OnInit } from '@angular/core';
import {  UserService, VideosService, User, Video } from '../core';
import {  Router } from '@angular/router';


@Component({
    selector: 'app-following-pages',
    templateUrl: './following.component.html'
})

export class FollowingComponent implements OnInit {
    user: User;
    videos: Video;
    videol = [];
    constructor(
        private userService: UserService,
        private videoService: VideosService,
        private router: Router
    ){

    }

    ngOnInit(){
        this.userService.isAuthenticated.subscribe(
            (authenticated) => {
              // Not authenticated? Push to login screen
            if (!authenticated) {
                this.router.navigateByUrl('/login');
            }

            this.userService.currentUser.subscribe(
                (userData: User) => {
                    this.user = userData;
                    this.videoService.following(this.user).subscribe(data => {
                        this.videos = data;
                        this.videol = data;
                    })
                }
            );
        });
    }
}