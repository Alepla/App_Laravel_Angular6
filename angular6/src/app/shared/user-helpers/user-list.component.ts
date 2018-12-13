import {Component, Input } from '@angular/core';

import {User} from '../../core';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html'/*,
    styleUrls: ['./video-preview.component.css']*/
})

export class UserListComponent {
    @Input() user: User;
}