import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search.component';
import { SearchResolver } from './search-resolver.services';

const routes: Routes = [{
    path: ':filter',
    component: SearchComponent,
    resolve: {
        search: SearchResolver
    }
}];
  
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class SearchRoutingModule {}