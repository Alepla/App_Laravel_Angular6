import { Component, OnInit } from '@angular/core';
import { Video, VideosService, VideoListConfig } from '../core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-search-page',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
    videos: Video;
    listConfig: VideoListConfig = {
        type: 'all',
        filters: {},
        paginate: false
    };
    
    constructor(
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.data.subscribe(
            (data: { search: Video }) => {
                this.videos = data.search;
                console.log(this.videos)
            }
        );
    }

}