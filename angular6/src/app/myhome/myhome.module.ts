import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {MyHomeComponent} from './myhome.component';
import {MyHomeRoutingModule} from './myhome-rounting.module';

@NgModule({
    imports: [
        MyHomeRoutingModule
    ],
    declarations: [
        MyHomeComponent
    ]
})

export class MyHomeModule {}