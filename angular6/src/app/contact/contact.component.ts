import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Contact, ContactService } from '../core';

@Component({
    selector: 'app-contact-page',
    templateUrl: './contact.component.html'
  })
  export class ContactComponent {
    contact: Contact = {} as Contact;
    contactForm: FormGroup;
    errors: Object = {};
    isSubmitting = false;

    constructor(
        private contactService: ContactService,
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder
    ){
        this.contactForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            subject: ['I have a problem updating a video'],
            message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(100)]]
        });
    }

    options = [
        { name: "I have a problem updating a video", value: 1 },
        { name: "I have a problem creating an account", value: 2 },
        { name: "I have a problem watching a video", value: 3 },
        { name: "Other...", value: 4 }
    ]

    get f() { return this.contactForm.controls; }

    submitForm() {
        this.updateArticle(this.contactForm.value);
        //console.log(this.contact);

        this.isSubmitting = true;

        if (this.contactForm.invalid) {
            return;
        }

        /*this.contactService.send(this.contact).subscribe(data => {
            console.log(data);
            this.isSubmitting = false;
            //this.router.navigateByUrl('/');
        });*/

    }

    updateArticle(values: Object) {
        Object.assign(this.contact, values);
    }
  }