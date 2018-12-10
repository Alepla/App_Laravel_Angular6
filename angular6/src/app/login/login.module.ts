import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';

import { LoginComponent } from './login.component';
import { LoginResolver } from './login-resolver.service';
import { LoginRoutingModule } from './login-routing.module';
import { NoLoginGuard } from './no-login-guard.service';

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    NoLoginGuard,
    LoginResolver
  ]
})
export class LoginModule {}
