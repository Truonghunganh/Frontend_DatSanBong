import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/services/auth.service'
import { Router } from '@angular/router';


@Component({
    selector: 'sb-layout-innkeeper1',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './layout-innkeeper1.component.html',
    styleUrls: ['layout-innkeeper1.component.scss'],
})
export class LayoutInnkeeper1Component implements OnInit, OnDestroy {
    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,

        private authService: AuthService
    ) {

    }
    subscription: Subscription = new Subscription();
    user: any;
    ngOnInit() {
        this.authService.checkTokenInnkeeper().subscribe(data => {
            console.log(data);
            
            if (data.status) {
                this.user = data.user;
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
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    thongtin() {
        Swal.fire({
            html: '<div><strong>' + this.user.name + '</strong></div>' +
                '<div><strong>' + this.user.phone + '</strong></div>' +
                '<div><strong>' + this.user.address + '</strong></div>' +
                '<div><strong>' + this.user.gmail + '</strong></div>' +
                '<div><a href="/dashboard/edituser">chỉnh sữa thông tin</a></div>',
            showCancelButton: true,
            confirmButtonText: "đăng xuất",
        }).then((result) => {
            if (result.isConfirmed) {
                this.authService.logout();
            }
        });

    }


}
