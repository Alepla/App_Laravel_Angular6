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
    userVideos: Video;
    uniqueUser: User;
    nameuser = "";
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
                let val;
                let arr = [];
                
                if(!search.search.userVideos.original.searches)
                    search.search.userVideos.original.searches = [];
                this.userVideos = search.search.userVideos.original.searches;
                
                this.uniqueUser = search.search.users.original.searches[0];

                if(search.search.users.original.searches[0])
                    this.nameuser = search.search.users.original.searches[0].username;
                else
                    this.nameuser = "";

                search.search.users.original.searches.forEach((element,key) => {
                    if(key > 0)
                        arr.push(element);   
                });
                
                search.search.users.original.searches = arr;
                this.users = search.search.users.original.searches;
                arr = [];

                if(search.search.userVideos.original.searches.length > 0){
                    console.log(search.search.userVideos.original.searches.length)
                    search.search.videos.original.searches.forEach(element => {
                        val = search.search.userVideos.original.searches.find(({id}) => element.id === id);
                        if(!val){
                            arr.push(element);
                        }
                    });
                
                    search.search.videos.original.searches = arr;
                }else{
                    this.userVideos = null;
                }
                this.videos = search.search.videos.original.searches;
            }
        );
    }

}