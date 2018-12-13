import { Component, OnInit } from '@angular/core';
import { User, Video, VideoListConfig } from '../core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-search-page',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
    videos: Video;
    users: User;
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
            (search) => {
                this.videos = search.search.videos.original.searches;
                this.users = search.search.users.original.searches;
            }
        );
    }

}