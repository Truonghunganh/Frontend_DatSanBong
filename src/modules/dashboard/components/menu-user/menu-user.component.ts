import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-menu-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './menu-user.component.html',
    styleUrls: ['menu-user.component.scss'],
})
export class MenuUserComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
