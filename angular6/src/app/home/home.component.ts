import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { VideoListConfig, UserService, VideosService, Video, LabelsService } from '../core';

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
    filters: {},
    paginate: true
  };
  labels: Array<string> = [];
  labelsLoaded = false;
  video: Video;
  limit = 6;
@HostListener('window:resize') onResize(event){
  this.changeLimit(window.innerWidth);
}
  ngOnInit() {
    
    this.changeLimit(window.innerWidth);

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
      console.log(video)
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
    this.listConfig = {type: type, filters: filters, paginate:true};
  }

  changeLimit(size){
    if(size <= 910 && this.limit != 2){
      this.limit = 2;
      this.setListTo('all',{});
    }else if(size <= 1200 && size > 910 && this.limit != 3){
      this.limit = 3;
      this.setListTo('all',{});
    }else if(size <= 1490 && size > 1200 && this.limit != 4){
      this.limit = 4;
      this.setListTo('all',{});
    }else if(size <= 1785 && size > 1490 && this.limit != 5){
      this.limit = 5;
      this.setListTo('all',{});
    }else if(size > 1785 && this.limit <= 5){
      this.limit = 6;
      this.setListTo('all',{});
    }
  }
}
