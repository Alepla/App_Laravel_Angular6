import {  NgModule } from '@angular/core';
import {FollowingComponent} from './following.component';
import {FollowingRoutingModule} from './following-routing.module';
import { SharedModule } from '../shared';

@NgModule({
    imports: [
        SharedModule, 
        FollowingRoutingModule 
    ],
    declarations: [
        FollowingComponent
    ]
})

export class FollowingModule {}