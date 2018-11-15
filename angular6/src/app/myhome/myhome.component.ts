import { Component, OnInit } from '@angular/core';

import {VideosService} from '../core';

@Component({
  selector: 'app-home-page',
  templateUrl: './myhome.component.html'
})
export class MyHomeComponent implements OnInit {
  constructor(
    private VideosService: VideosService
  ) {}
  ngOnInit(){
      console.log("Estic asi moniato")
      this.VideosService.getVideos().subscribe(tags => {
        console.log(tags)
      });
  }
}
