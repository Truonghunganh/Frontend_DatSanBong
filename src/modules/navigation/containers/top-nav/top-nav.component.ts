import { NavigationService } from '@modules/navigation/services';
import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service'
import { Router } from '@angular/router';
@Component({
    selector: 'sb-top-nav',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './top-nav.component.html',
    styleUrls: ['top-nav.component.scss'],
})
export class TopNavComponent implements OnInit {
    constructor(
        private navigationService: NavigationService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
      private authService: AuthService
    ) {

    }
    toggleSideNav() {
        this.navigationService.toggleSideNav();
    }

    user: any;
    ngOnInit() {
        this.authService.checkTokenAdmin().subscribe(data => {

            if (data.status) {
                this.user = data.admin;
                this.changeDetectorRef.detectChanges();
                console.log(this.user);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                })
                this.router.navigate(['/auth/login']);
            }
        })
    }
    thongtin() {
        Swal.fire({
            html: '<div><strong>' + this.user.name + '</strong></div>' +
                '<div><strong>' + this.user.phone + '</strong></div>' +
                '<div><strong>' + this.user.address + '</strong></div>' +
                '<div><strong>' + this.user.gmail + '</strong></div>' +
                '<div><a href="/admin/editadmin">chỉnh sữa thông tin</a></div>',
            showCancelButton: true,
            confirmButtonText: "đăng xuất",
        }).then((result) => {
            if (result.isConfirmed) {
                this.authService.logout();
            }
        });

    }

}
