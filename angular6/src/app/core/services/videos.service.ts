import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiService } from './api.service';
import { Video, VideoListConfig } from '../models';
import { map } from 'rxjs/operators/map';

@Injectable()
export class VideosService {
    constructor (
        private apiService: ApiService
    ) {}

    /*getVideos(): Observable <[String]> {
        return this.apiService.get('/videos')
                              .pipe(map(data => data.videos))  
    }*/
    query(config: VideoListConfig): Observable<{videos: Video[]}> {
        // Convert any filters over to Angular's URLSearchParams
        const params = {};

        /*Object.keys(config.filters)
        .forEach((key) => {
            params[key] = config.filters[key];
        });*/

        return this.apiService
        .get(
            '/videos' /*+ ((config.type === 'slug') ? '/slug' : ''),
            new HttpParams({ fromObject: params })*/
        )
    }
    get(slug): Observable<Video> {
        return this.apiService.get('/videos/' + slug)
          .pipe(map(data => data.video));
      }
}
