import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { VideoListConfig, LabelsService, UserService, VideosService, Video } from '../core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private labelsService: LabelsService,
    private userService: UserService,
    private videoService: VideosService
  ) {}

  isAuthenticated: boolean;
  listConfig: VideoListConfig = {
    type: 'all',
    filters: {}
  };
  labels: Array<string> = [];
  labelsLoaded = false;
  video: Video;

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;

        // set the article list accordingly
        if (authenticated) {
          this.setListTo('feed');
        } else {
          this.setListTo('all');
        }
      }
    );

    this.labelsService.getAll()
    .subscribe(labels => {
      this.labels = labels;
      this.labelsLoaded = true;
    });

    this.videoService.getBest()
    .subscribe(video => {
      this.video = video;
    });
  }

  setListTo(type: string = '', filters: Object = {}) {
    // If feed is requested but user is not authenticated, redirect to login
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    // Otherwise, set the list object
    this.listConfig = {type: type, filters: filters};
  }
}
