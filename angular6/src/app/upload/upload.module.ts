import {  NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {UploadComponent} from './upload.component';
import {UploadRoutingModule} from './upload-routing.module';
import { SharedModule } from '../shared';

@NgModule({
    imports: [
        SharedModule, UploadRoutingModule, ReactiveFormsModule
    ],
    declarations: [
        UploadComponent
    ]
})

export class UploadModule {}