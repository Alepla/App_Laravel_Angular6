import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})

export class SearchComponent {
    searchForm: FormGroup

    constructor(
        private fb: FormBuilder
    ){
        this.searchForm = this.fb.group({
            name: ['',Validators.required]
        })
    }
    searchName(){
        console.log(this.searchForm.value.name)
    }
}