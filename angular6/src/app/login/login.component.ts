import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Errors, LoginService } from '../core';

import {
  AuthService,
  GoogleLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginType: String = '';
  title: String = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  loginForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private fb: FormBuilder,
    private socialAuthService: AuthService,
    public toastr: ToastrManager
  ) {
    // use FormBuilder to create a form group
    this.loginForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {

        let username = userData.name.replace(/ /g, "");

        const credentials = {
          email: userData.email,
          password: userData.id,
          username: username,
          image: userData.image
        }
        
        this.isSubmitting = true;
        this.errors = {errors: {}};

        this.loginService
        .attemptSocialLogin(this.loginType, credentials)
        .subscribe(
          data => {
            this.toastr.successToastr('Greate to see you again '+ credentials.username, 'Success!');
            window.location.replace('/');
          },
          err => {
            this.toastr.errorToastr(err.text, 'Oops!');
            this.errors = err;
            this.isSubmitting = false;
          }
        );
      }
    );
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.loginType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.loginType === 'logiin') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.loginType === 'regiister') {
        this.loginForm.addControl('username', new FormControl());
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};

    const credentials = this.loginForm.value;
    
    this.loginService
    .attemptLogin(this.loginType, credentials)
    .subscribe(
      data => {
        this.toastr.successToastr('Greate to see you again '+ credentials.username, 'Success!');
        window.location.replace('/');
      },
      err => {
        this.toastr.errorToastr('Something no good happened here', 'Oops!');
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}
