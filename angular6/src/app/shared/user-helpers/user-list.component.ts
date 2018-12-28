import {Component, Input, OnInit } from '@angular/core';

import {User, UserService, SubscribeService} from '../../core';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html'/*,
    styleUrls: ['./video-preview.component.css']*/
})

export class UserListComponent implements OnInit{
    @Input() user: User;

    constructor(
        private userService: UserService,
        private subscribeService: SubscribeService
    ) { }

    ngOnInit() {
        this.userService.isAuthenticated.subscribe(
            (authenticated) => {
              // Not authenticated? Push to login screen
            if (!authenticated) {
                this.user['subscribe'] = false;
            }else{
                this.subscribeService.checkSubscribe(this.user.id).subscribe(data => {
                    this.user['subscribe'] = data.state;
                    this.user['followers'] = data.followers;
                });
            }
            
        });
    }

    onToggleSubscribe(subscribe: boolean) {
        this.user['subscribe'] = subscribe;

        if (subscribe) {
            this.user['followers']++;
        } else {
            this.user['followers']--;
        }
    }
}