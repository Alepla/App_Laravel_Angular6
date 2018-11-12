import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
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
        private fb: FormBuilder,
        public toastr: ToastrManager
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
        this.updateContact(this.contactForm.value);
        //console.log(this.contact);

        this.isSubmitting = true;

        if (this.contactForm.invalid) {
            return;
        }

        this.contactService.send(this.contact).subscribe(data => {
            this.toastr.successToastr('The mail was send correctly.', 'Success!');
            console.log(data);
            this.isSubmitting = false;
            //this.router.navigateByUrl('/');
        });

    }

    updateContact(values: Object) {
        Object.assign(this.contact, values);
    }
  }

/*this.toastr.successToastr('This is success toast.', 'Success!');
this.toastr.errorToastr('This is error toast.', 'Oops!');
this.toastr.warningToastr('This is warning toast.', 'Alert!');
this.toastr.infoToastr('This is info toast.', 'Info');*/