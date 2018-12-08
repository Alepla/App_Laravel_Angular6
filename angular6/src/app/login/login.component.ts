import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Errors, LoginService } from '../core';

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
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.loginForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
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
        console.log(data);
        this.router.navigateByUrl('/');
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}
