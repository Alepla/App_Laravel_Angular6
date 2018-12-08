import {Component,Input} from '@angular/core';

import { Video, VideoListConfig, VideosService } from '../../core';

@Component({
    selector:"app-video-list",
    templateUrl: './video-list.component.html'
})

export class VideoListComponent {
    constructor(private VideosService: VideosService){
    }

    @Input() limit: number;
    @Input()
    set config(config: VideoListConfig) {
        if (config) {
            this.query = config;
            this.currentPage = 1;
            this.runQuery();
        }
    }

    query: VideoListConfig;
    results: Video[];
    loading = false;
    currentPage = 1;
    totalPages: Array<number> = [1];

    setPageTo(pageNumber) {
        this.currentPage = pageNumber;
        this.runQuery();
    }

    runQuery() {
        this.loading = true;
        this.results = [];
        console.log(this.limit);
        // Create limit and offset filter (if necessary)
        if (this.limit) {
            this.query.filters.limit = this.limit;
            this.query.filters.offset =  (this.limit * (this.currentPage - 1));
        }

        this.VideosService.query(this.query)
        .subscribe(data => {
            this.loading = false;
            this.results = data.videos;
            // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
            this.totalPages = Array.from(new Array(Math.ceil(data.videosCount / this.limit)), (val, index) => index + 1);
        });
    }
}