import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoComponent } from './video.component';
import { VideoResolver } from './video-resolver.module';

const routes: Routes = [{
    path: ':slug',
    component: VideoComponent,
    resolve: {
        video: VideoResolver
    }
}];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class VideoRoutingModule {}