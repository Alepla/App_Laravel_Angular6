import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { NoLoginGuard } from './no-login-guard.service';

const routes: Routes = [
  {
    path: 'logiin',
    component: LoginComponent,
    canActivate: [NoLoginGuard]
  },
  {
    path: 'regiister',
    component: LoginComponent,
    canActivate: [NoLoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
