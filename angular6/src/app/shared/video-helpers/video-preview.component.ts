import {Component, Input } from '@angular/core';

import {Video} from '../../core';

@Component({
    selector: 'app-video-preview',
    templateUrl: './video-preview.component.html',
    styleUrls: ['./video-preview.component.css']
})

export class VideoPreviewComponent {
    @Input() video: Video;
}