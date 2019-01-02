import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { VideoListConfig, UserService, VideosService, Video, LabelsService } from '../core';

import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import gql from 'graphql-tag';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  videosQuery: Subscription;
  labelsQuery: Subscription;

  constructor(
    private router: Router,
    private labelsService: LabelsService,
    private userService: UserService,
    private videoService: VideosService,
    private apollo: Apollo
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
    
    /*this.labelsService.getAll()
    .subscribe(labels => {
      console.log(labels);
      this.labels = labels;
      this.labelsLoaded = true;
    });*/

    this.labelsQuery = this.apollo.query({
      query: gql`
        query labels{
          labels{
            name
          }
        }
      `
    }).subscribe(result => {
      let labels = [];
      result.data['labels'].map((x) => {
        labels.push(x.name);
      });
      this.labels = labels;
      this.labelsLoaded = true;
    });

    /*this.videoService.getBest()
    .subscribe(video => {
      this.video = video;
    });

    /**
     *   
      query videos{
        videos(first:1){
            title
        }
      }
     */

    this.videosQuery = this.apollo.query({
      query: gql`
        query video{
          video(where: { id: "cjq9vcuke000w0973zl1t6buh" }){
            title
            description
            video
            thumbnail
            state
            category
            views
          }
        }
      `
    }).subscribe(result => {
      this.video = result.data['video'];
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
