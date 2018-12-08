import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { NoLoginGuard } from './no-login-guard.service';
import { SharedModule } from '../shared';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    NoLoginGuard
  ]
})
export class LoginModule {}
