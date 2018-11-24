import { Component, OnInit } from '@angular/core';
import { Video, VideosService } from '../core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-article-page',
    templateUrl: './video.component.html'
})

export class VideoComponent implements OnInit {

    video: Video;

    constructor(
        private route: ActivatedRoute
        //private VideoService: VideosService,
    ) { }

    ngOnInit() {
        this.route.data.subscribe(
            (data: { video: Video }) => {
                this.video = data.video;
            }
        );
    }
}