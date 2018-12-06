import {  NgModule } from '@angular/core';

import { SearchComponent } from './search.component';
import { SearchResolver } from './search-resolver.services';
import { SearchRoutingModule } from './search-rounting.module';
import { SharedModule } from '../shared';

@NgModule({
    imports: [
        SharedModule,
        SearchRoutingModule
    ],
    declarations: [
        SearchComponent
    ],
    providers: [
        SearchResolver
    ]
})

export class SearchModule {}