import {  NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {UploadComponent} from './upload.component';
import {UploadRoutingModule} from './upload-routing.module';
import { SharedModule } from '../shared';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../../environments/environment';

@NgModule({
    imports: [
        SharedModule, 
        UploadRoutingModule, 
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule
    ],
    declarations: [
        UploadComponent
    ]
})

export class UploadModule {}