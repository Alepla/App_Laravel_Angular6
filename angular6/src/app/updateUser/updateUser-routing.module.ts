import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateUserComponent } from './updateUser.component';

const routes: Routes = [
    {
      path: '',
      component: UpdateUserComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UpdateUserRoutingModule {}
  