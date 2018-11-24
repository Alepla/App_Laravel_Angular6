import {  NgModule } from '@angular/core';

import { VideoComponent } from './video.component';
import { VideoResolver } from './video-resolver.module';
import { VideoRoutingModule } from './video-routing.module';

@NgModule({
    imports: [
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