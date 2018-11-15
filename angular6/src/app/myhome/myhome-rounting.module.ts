import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MyHomeComponent} from './myhome.component';

const routes: Routes = [
    {
      path: '',
      component: MyHomeComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MyHomeRoutingModule {}