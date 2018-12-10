import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { NoLoginGuard } from './no-login-guard.service';
import { LoginResolver } from './login-resolver.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoLoginGuard]
  },
  {
    path: 'register',
    component: LoginComponent,
    canActivate: [NoLoginGuard]
  },
  {
    path: 'sociallogin',
    component: LoginComponent,
    resolve: {
      login: LoginResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
