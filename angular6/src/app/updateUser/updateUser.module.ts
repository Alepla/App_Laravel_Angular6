import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UpdateUserComponent } from './updateUser.component';
import { SharedModule } from '../shared';
import { UpdateUserRoutingModule } from './updateUser-routing.module';

@NgModule({
    imports: [SharedModule, UpdateUserRoutingModule, ReactiveFormsModule],
    declarations: [UpdateUserComponent]
})
export class UpdateUserModule {}
  