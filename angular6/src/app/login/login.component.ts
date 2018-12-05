import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Errors, LoginService } from '../core';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
    selector: 'app-login-page',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    loginType: String = '';
    title: String = '';
    loginForm: FormGroup;
    isSubmitting = false;
    errors: Errors = {errors: {}};

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private loginService: LoginService,
        private router: Router,
        private toastr: ToastrManager
    ){
        this.loginForm = this.fb.group({
            'email': ['', [ Validators.required,
                            Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/)]],
            'password': ['',Validators.required]
        });
        
    }

    ngOnInit() {
        this.route.url.subscribe(data => { 
            this.loginType = data[data.length - 1].path;
            this.title = this.loginType === 'login' ? 'Log in' : 'Register';
            this.loginType === 'register' ? this.loginForm.addControl('username',new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(25)])) : ''
        });
    }

    get f() { return this.loginForm.controls; }

    submitForm(){
        this.errors = {errors: {}};
        this.isSubmitting = true;
        
        if(this.loginForm.status === "VALID"){
            this.loginService
            .attemptLogin(this.loginType,this.loginForm.value)
            .subscribe(
                data => {
                    this.toastr.successToastr('You have registered correctly.', 'Welcome!');
                    window.location.reload();
                    this.router.navigateByUrl('/');
                },
                err => {
                    this.errors = err;
                    this.isSubmitting = false;
                }
            );
        }
    }

}