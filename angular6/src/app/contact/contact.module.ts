import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactComponent } from './contact.component';
import { SharedModule } from '../shared';
import { ContactRoutingModule } from './contact-routing.module';

@NgModule({
    imports: [SharedModule, ContactRoutingModule, ReactiveFormsModule],
    declarations: [ContactComponent]
})
export class ContactModule {}
  