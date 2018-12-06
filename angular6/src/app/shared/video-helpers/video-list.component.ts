import {Component,Input} from '@angular/core';

import { Video, VideoListConfig, VideosService } from '../../core';

@Component({
    selector:"app-video-list",
    templateUrl: './video-list.component.html',
    styleUrls: ['./video-list.component.css']
})

export class VideoListComponent {
    constructor(private VideosService: VideosService){
    }

    @Input() limit: number;
    @Input()
    set config(config: VideoListConfig) {
        if (config) {
            this.query = config;
            this.loading = config.paginate;
            this.currentPage = 1;
            this.runQuery();
        }
    }
    @Input() set exclude(exclude: string){
        if(exclude){
            this.excludes = exclude;
            this.runQuery();
        }
    };
    @Input() set data(dArray: String[]){
        if(dArray){
            this.limit = 0;
            this.dArray = dArray;
            this.runQuery();
        }
    }

    query: VideoListConfig;
    results: Video[];
    excludes = "";
    dArray = [];
    loading = false;
    currentPage = 1;
    totalPages: Array<number> = [1];

    setPageTo(pageNumber) {
        this.currentPage = pageNumber;
        this.runQuery();
    }

    runQuery() {
        //console.log(this.query.paginate);
        //this.loading = this.query.paginate;
        this.results = [];

        // Create limit and offset filter (if necessary)
        if (this.limit) {
            this.query.filters.limit = this.limit;
            this.query.filters.offset =  (this.limit * (this.currentPage - 1));
        }

        if(this.dArray.length > 0){
            this.results = this.dArray;
        }else{
            this.VideosService.query(this.query)
            .subscribe(data => {
                if(this.excludes)
                    this.results = data.videos.filter(elem => elem.id != this.excludes);
                else
                    this.results = data.videos;
                
                // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
                this.totalPages = Array.from(new Array(Math.ceil(data.videosCount / this.limit)), (val, index) => index + 1);
            });
        }
        let today = new Date();
        let minutes,hours,days,months,years;
        this.results.map(data => {
            minutes = Math.floor( ( ((today.getTime() + 3600000) - new Date(data.createdAt).getTime()) / 1000 ) / 60);
            hours = Math.floor(minutes / 60);
            days = Math.floor( minutes / (60 * 24));
            months = Math.floor( minutes / (60 * 24 * 30));
            years = Math.floor( minutes / (60 * 24 * 30 * 12));

            if(minutes < 1){
                data.time = "New video";
            }else if(minutes > 1 && minutes < 61){
                data.time = minutes + " minutes ago";
            }else if(minutes > 0 && minutes < 61){
                data.time = minutes + " minute ago";
            }else if(hours > 1 && hours < 25){
                data.time = hours + " hours ago";
            }else if(hours > 0 && hours < 25){
                data.time = hours + " hour ago";
            }else if(days > 1 && days < 31){
                data.time = days + " days ago";
            }else if(days > 0 && days < 31){
                data.time = days + " day ago";
            }else if(years > 1){
                data.time = years + " years ago";
            }else if(years > 0){
                data.time = years + " year ago";
            }else if(months > 1 && months < 13){
                data.time = months + " months ago";
            }else if(months > 0 && months < 13){
                data.time = months + " month ago";
            }
        })
    }
}