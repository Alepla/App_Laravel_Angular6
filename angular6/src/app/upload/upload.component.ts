import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Errors, UserService, UploadService } from '../core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
    selector: 'app-upload-page',
    templateUrl: './upload.component.html'
})

export class UploadComponent {
    uploadForm : FormGroup;
    state = new FormControl();
    category = new FormControl();
    tagControl = new FormControl();
    isSubmiting = false;
    states = ["Public","Private","Subscribers"];
    categories = [  "Blogs","Motor","Music","Animals","Sports","ESports","travels",
                    "videogames","Comedy","Entertainment","Notices","Clothing","Education",
                    "Education","Science","ONG"];
    tags = [];
    uploadedImage = null;

    imageSrc: any;
    videoSrc: any;
    userFile: any;
    imageSelected: any;
    imageHref: any;
    videoHref: any;
    errors: Errors = {errors: {}};

    constructor(
        private fb: FormBuilder,
        private uploadService: UploadService,
        private userService: UserService,
        private storage: AngularFireStorage,
        private router: Router,
        private toastr: ToastrManager
    ){

        
        this.uploadForm = this.fb.group({
            title: ['',Validators.required],
            state: ['Public'],
            category: ['Blogs'],
            description: ['',[Validators.required,Validators.minLength(30),Validators.maxLength(200)]],
            slug: '',
            video: '',
            image: '',
            userid: '',
            tags: []
        });
    }

    get f() { return this.uploadForm.controls; }

    addTag(){
        if(this.tags.indexOf(this.tagControl.value) < 0){
            this.tags.push(this.tagControl.value);
        }
        this.tagControl.reset('');
    }
    savePctv(pctv){
        this.pctv = pctv;
    }
    ImageTask;VideoTask;uploadProgressI;uploadProgressV;pctv;pcti;
    saveFile(event,file){
        this.userFile = event.target.files[0];
        this.imageSelected = this.userFile.name;
        console.log(event.target.files)
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                if(file === "image"){
                    const randomId = Math.random().toString(36).substring(2);
                    this.ImageTask = this.storage.upload('/images/'+randomId,event.target.files[0]);
                    this.uploadProgressI = this.ImageTask.percentageChanges();
                    this.imageSrc = e.target.result;
                }
                else{
                    const randomId = Math.random().toString(36).substring(2);
                    this.VideoTask = this.storage.upload('/videos/'+randomId,event.target.files[0]);
                    this.uploadProgressV = this.VideoTask.percentageChanges();
                    console.log(this.uploadProgressV);
                    this.videoSrc = e.target.result;
                }
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    delFile(file){
        if(file === "image")
            this.imageSrc = null;
        else
            this.videoSrc = null;
    }

    removeTag(tagName: string) {
        this.tags = this.tags.filter(tag => tag !== tagName);
    }

    submitForm(){
        this.errors = {errors: {}};
        this.isSubmiting = true;
        if (this.uploadForm.invalid || !this.userService.getCurrentUser() || this.tags.length < 1) {
            return;
        }
        
        this.ImageTask.task.snapshot.ref.getDownloadURL().then(data => {
            this.uploadForm.value.image = data;
            this.VideoTask.task.snapshot.ref.getDownloadURL().then(data => {
                this.uploadForm.value.video = data;

                let user = this.userService.getCurrentUser();
                this.uploadForm.value.userid = user.id;
                this.uploadForm.value.tags = this.tags;

                let slug = this.uploadForm.value.title.toLowerCase();
                this.uploadForm.value.slug = slug.replace(/\s/g,"-");
                
                this.uploadService.saveVideo(this.uploadForm.value).subscribe((data) => {
                    console.log(data)
                    this.toastr.successToastr('You were created a video correctly.');
                    this.router.navigateByUrl('/');
                },
                err => {
                    this.errors = err;
                });
            },err => {return});
        },err => {return})
        
    }
}