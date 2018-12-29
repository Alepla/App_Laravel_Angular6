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
    
    query(config: VideoListConfig): Observable<{videos: Video[],videosCount: number}> {
        // Convert any filters over to Angular's URLSearchParams
        const params = {};

        Object.keys(config.filters)
        .forEach((key) => {
            params[key] = config.filters[key];
        });

        return this.apiService
        .get(
            '/videos' + ((config.type === 'slug') ? '/slug' : ''),
            new HttpParams({ fromObject: params })
        )
    }
    get(slug): Observable<Video> {
        return this.apiService.get('/videos/' + slug)
          .pipe(map(data => data.video));
    }

    getBest(): Observable<Video> {
        return this.apiService.get('/video/')
          .pipe(map(data => data.video));
    }

    like(slug): Observable<Video> {
        return this.apiService.post('/videos/' + slug + '/like');
    }
    
    notlike(slug): Observable<Video> {
        return this.apiService.delete('/users/' + slug + '/like');
    }

    dislike(slug): Observable<Video> {
        return this.apiService.post('/videos/' + slug + '/dislike');
    }

    notdislike(slug): Observable<Video> {
        return this.apiService.delete('/videos/' + slug + '/dislike');
    }
    
    sumView(video): Observable<Video> {
        return this.apiService.put('/sumview',{video})
          .pipe(map(data => data.video));
    }

    following(user): Observable<any> {
        return this.apiService.get('/following?user='+user.id)
          .pipe(map(data => data.videos));
    }
}
