import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Errors, User } from '../core';

import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import gql from 'graphql-tag';

@Component({
    selector: 'app-updateUser-page',
    templateUrl: './updateUser.component.html'
  })
  export class UpdateUserComponent {
    infoUserQuery: Subscription;
    updateUserForm: FormGroup;
    errors: Errors = {errors: {}};
    isSubmitting = false;
    user: User;

    constructor(
        private fb: FormBuilder,
        public toastr: ToastrManager,
        private apollo: Apollo
    ){
        this.updateUserForm = this.fb.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            bio: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(100)]]
        });
    }

    ngOnInit() {
        this.infoUserQuery = this.apollo.query({
            query: gql`
                query users{
                    users(where: { username: "alepla" }){
                        id
                        username
                        email
                        password
                        followers
                        bio
                        image
                    }
                }
            `
        }).subscribe(result => {
            this.user = result.data['users'][0];
            console.log(this.user.id);
        });
    }

    get f() { return this.updateUserForm.controls; }

    submitForm() {
        this.isSubmitting = true;
        if(this.user) {
            if(!this.updateUserForm.value.username) this.updateUserForm.value.username = this.user.username;
            if(!this.updateUserForm.value.email) this.updateUserForm.value.email = this.user.email;
            if(!this.updateUserForm.value.bio) this.updateUserForm.value.bio = this.user.username;
        }
        this.apollo.mutate({
            mutation: gql`
                mutation updateuser($data: userUpdateInput!, $where: userWhereUniqueInput!) {
                    updateuser(data: $data, where: $where) {
                        id
                        username
                        email
                        password
                        followers
                        bio
                        image
                    }
                }
            `,
            variables: {
                data: {
                    username: this.updateUserForm.value.username,
                    email: this.updateUserForm.value.email,
                    bio: this.updateUserForm.value.bio
                },
                where: {
                    id: this.user.id
                }
            }
          }).subscribe(({ data }) => {
                console.log(data);
          }, (error) => {
                console.log('there was an error sending the query', error);
          });
    }
}

/*this.toastr.successToastr('This is success toast.', 'Success!');
this.toastr.errorToastr('This is error toast.', 'Oops!');
this.toastr.warningToastr('This is warning toast.', 'Alert!');
this.toastr.infoToastr('This is info toast.', 'Info');*/