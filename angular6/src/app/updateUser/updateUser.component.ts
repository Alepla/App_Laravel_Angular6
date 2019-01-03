import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Errors, User, UserService } from '../core';

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
    currentUser: User;

    constructor(
        private fb: FormBuilder,
        public toastr: ToastrManager,
        private userService: UserService,
        private apollo: Apollo
    ){
        this.updateUserForm = this.fb.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            bio: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(100)]]
        });
    }

    ngOnInit() {

        this.userService.currentUser.subscribe(
            (userData) => {
              this.currentUser = userData;
              if(this.currentUser.username) {
                this.infoUserQuery = this.apollo.query({
                    query: gql`
                        query users($where: userWhereInput){
                            users(where: $where){
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
                        where: {
                            username: this.currentUser.username
                        }
                    }
                }).subscribe(result => {
                    this.user = result.data['users'][0];
                });
              }
            }
        );
    }

    get f() { return this.updateUserForm.controls; }

    submitForm() {
        this.isSubmitting = true;

        if(this.user) {
            if(!this.updateUserForm.value.username) this.updateUserForm.value.username = this.user.username;
            if(!this.updateUserForm.value.email) this.updateUserForm.value.email = this.user.email;
            if(!this.updateUserForm.value.bio) this.updateUserForm.value.bio = this.user.bio;
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
                this.toastr.successToastr('The data was updated succsesfully', 'Success!');
          }, (error) => {
                console.log(error);
                this.toastr.errorToastr('Something wrong was happened', 'Oops!');
          });
    }
}