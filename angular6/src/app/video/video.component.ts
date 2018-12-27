import { Component, OnInit } from '@angular/core';
import { Video, VideosService, VideoListConfig } from '../core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-article-page',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.css']
})

export class VideoComponent implements OnInit {

    video: Video;
    listConfig: VideoListConfig = {
        type: 'all',
        filters: {},
        paginate: false
    };

    constructor(
        private route: ActivatedRoute,
        private videoService: VideosService,
    ) { }

    ngOnInit() {
        this.route.data.subscribe(
        (data: { video: Video }) => {
            this.video = data.video;
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
}