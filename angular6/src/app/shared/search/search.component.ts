import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SearchService } from '../../core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})

export class SearchComponent implements OnInit {
    searchTerm : FormControl = new FormControl();
    infoAuto = [];

    constructor(
        private router: Router,
        private searchservice: SearchService
    ){
    }

    ngOnInit(){
        this.infoAuto = this.getLocal();
    }
    searchName(searchValue: String){
        if(searchValue){
            this.saveinLocal(searchValue);
            this.router.navigateByUrl('/search/'+searchValue);
        }
    }

    inputChange(searchValue : string){
        if(searchValue){
            this.searchservice.getAutoFilter(searchValue).subscribe(data => {
                let videos = data.videos.original.searches;
                let users = data.users.original.searches;
                if(users.length > 0 && videos.length > 0){
                    if( videos.length > 3)
                        videos = this.getTitle(videos.splice(0,3));
                    else
                        videos = this.getTitle(videos);
    
                    if(users.length > 2)
                        users = this.getName(users.splice(0,2));
                    else
                        users = this.getName(users);
    
                    this.infoAuto = users.concat(videos);
                }else if(users.length > 0){
                    if(users.length > 5)
                        users = this.getName(users.splice(0,5));
                    else
                        users = this.getName(users);
                    this.infoAuto = users;
                }else if(videos.length > 0){
                    if( videos.length > 5)
                        videos = this.getTitle(videos.splice(0,5));
                    else
                        videos = this.getTitle(videos);
                    this.infoAuto = videos;
                }else{
                    this.infoAuto = [];
                }
            });
        }else
            this.infoAuto = this.getLocal();    
        
    }

    getName(array){
        return array.map(data => {
            return data.username;
        });
    }

    getTitle(array){
        return array.map(data => {
            return data.title;
        });
    }

    saveinLocal(searchValue){
        let datal = [];
        if(JSON.parse(localStorage.getItem("search"))){
            datal = JSON.parse(localStorage.getItem("search"));
            if(datal.length >= 5){
                datal = datal.splice(0,4);
            }
            let found = datal.filter(data => data === searchValue);
            if(found.length < 1){
                datal.unshift(searchValue);
                localStorage.setItem("search",JSON.stringify(datal));
            }
        }else {
            datal.push(searchValue);
            localStorage.setItem("search",JSON.stringify(datal));
        }
    }

    getLocal(){
        return JSON.parse(localStorage.getItem("search"));
    }

}