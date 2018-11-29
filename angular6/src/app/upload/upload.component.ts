import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-upload-page',
    templateUrl: './upload.component.html'
})

export class UploadComponent {
    uploadForm : FormGroup;
    stateControl = new FormControl();
    categoryControl = new FormControl();
    tagControl = new FormControl();
    isSubmiting = false;
    states = ["Public","Private","Subscribers"];
    categories = [  "Blogs","Motor","Music","Animals","Sports","ESports","travels",
                    "videogames","Comedy","Entertainment","Notices","Clothing","Education",
                    "Education","Science","ONG"];
    tags = [];
    uploadedImage = null;

    constructor(
        private fb: FormBuilder
    ){
        this.uploadForm = this.fb.group({
            title: ['',Validators.required],
            stateControl: ['Public'],
            categoryControl: ['Blogs'],
            description: ['',[Validators.required,Validators.minLength(30),Validators.maxLength(200)]]
        });
    }

    get f() { return this.uploadForm.controls; }

    addTag(){
        if(this.tags.indexOf(this.tagControl.value) < 0){
            this.tags.push(this.tagControl.value);
        }
        this.tagControl.reset('');
    }

    saveImage(e){
        this.uploadedImage = e.target.files[0];
    }

    removeTag(tagName: string) {
        this.tags = this.tags.filter(tag => tag !== tagName);
    }

    submitForm(){
        this.isSubmiting = true;
        if (this.uploadForm.invalid) {
            return;
        }
        console.log(this.uploadForm.value)
    }
}