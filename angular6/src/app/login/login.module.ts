import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { NoLoginGuard } from './no-login-guard.service';
import { SharedModule } from '../shared';
import { LoginRoutingModule } from './login-routing.module';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider
} from "angular-6-social-login";

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("961540714560-rgc0h4nonn3kmv9ak2814gs0ec077sf7.apps.googleusercontent.com")
        }
      ]
  );
  return config;
}

@NgModule({
  imports: [
    SharedModule,
    LoginRoutingModule,
    SocialLoginModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    NoLoginGuard,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ]
})
export class LoginModule {}
