import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationService } from '@modules/navigation/services';
import { AuthService} from '../../../auth/services/auth.service';
@Component({
    selector: 'sb-top-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav.component.html',
    styleUrls: ['top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
    constructor(private navigationService: NavigationService, private authService: AuthService) {}
    ngOnInit() {}
    toggleSideNav() {
        this.navigationService.toggleSideNav();
    }
    LogOut(){
        this.authService.logout();
    }
}
