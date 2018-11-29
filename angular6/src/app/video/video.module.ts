import {  NgModule } from '@angular/core';

import { VideoComponent } from './video.component';
import { VideoResolver } from './video-resolver.module';
import { VideoRoutingModule } from './video-routing.module';
import { SharedModule } from '../shared';

@NgModule({
    imports: [
        SharedModule,
        VideoRoutingModule
    ],
    declarations: [
        VideoComponent
    ],
    providers: [
        VideoResolver
    ]
})

export class VideoModule {}