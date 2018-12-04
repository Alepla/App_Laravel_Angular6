import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { NoLoginGuard } from './no-login-guard.service';

@NgModule({
  imports: [
    LoginRoutingModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    NoLoginGuard
  ]
})
export class LoginModule {}
