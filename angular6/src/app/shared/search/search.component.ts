import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})

export class SearchComponent {
    searchForm: FormGroup

    constructor(
        private fb: FormBuilder,
        private router: Router
    ){
        this.searchForm = this.fb.group({
            name: ['',Validators.required]
        })
    }
    searchName(){
        if(this.searchForm.valid)
            this.router.navigateByUrl('/search/'+this.searchForm.value.name);
    }
}