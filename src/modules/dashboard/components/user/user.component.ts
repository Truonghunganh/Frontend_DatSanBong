import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import {  Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service'
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';


@Component({
    selector: 'sb-user',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './user.component.html',
    styleUrls: ['user.component.scss'],
})
export class UserComponent implements OnInit {
    ListDatSanByIduservaonhungngaytoi: any;
    checklistdansan = false;
    constructor(
        private dashboardService: DashboardService,
        private changeDetectorRef: ChangeDetectorRef,
        private router: Router,
        private authService: AuthService
    ) { }
    ngOnInit() {
        this.getListDatSanByUserToken();
    }
    
    getListDatSanByUserToken() {
        this.page=1;
        this.checklistdansan = false;
        this.dashboardService.getListDatSanByUserToken().subscribe(data => {
            console.log(data);
            
            if (data.status) {
                this.ListDatSanByIduservaonhungngaytoi = data.datsans;
                this.taodatsansnew(this.page);
                this.checklistdansan = true;
                this.changeDetectorRef.detectChanges();
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                })

            } 
        })
    }
    datsansnew: any;
    page = 1;
    tongpage = 0;
    mangtrang: any;
    taodatsansnew(page: number) {
        this.datsansnew = [];
        this.tongpage = this.ListDatSanByIduservaonhungngaytoi.length / 10;
        let i = (page - 1) * 10;
        let k;
        if (page<this.tongpage){
            k = 10;
        }else{
            k = this.ListDatSanByIduservaonhungngaytoi.length %10;
            console.log(k);
            
        }
        console.log(this.tongpage,i, k,page);
        
        for (let j = 0; j<k; j++) {
            if (j == 10) {
                break;
            }
            this.datsansnew.push(this.ListDatSanByIduservaonhungngaytoi[i + j]);

        }
        console.log(this.datsansnew);

        this.taomangtrang(page);
    }
    taomangtrang(page: number) {
        var mang: Array<boolean> = [];
        for (let i = 0; i < this.tongpage; i++) {
            mang.push(false);

        }
        mang[page - 1] = true;
        this.mangtrang = mang;

    }


    taomangtrangNew(page: number) {
        var mang: Array<boolean> = [];
        if(this.tongpage>3){
            
        }
        var mang: Array<boolean> = [];
        for (let i = 0; i < this.tongpage; i++) {
            mang.push(false);

        }
        mang[page - 1] = true;
        this.mangtrang = mang;

    }

    Previous() {
        if (this.page > 1) {
            this.page--;
            this.taodatsansnew(this.page);
        }
    }
    Next() {
        if (this.page < this.tongpage) {
            this.page++;
            this.taodatsansnew(this.page);
        }
    }
    chontrang(page: number) {
        console.log(page);

        this.page = page;
        this.taodatsansnew(this.page);
    }

    editUser(){
        this.router.navigate(['/dashboard/edituser']);
        
    }
    deleteDatSan(datsan:any){
       let a= new Date().toISOString().
            replace(/T/, ' ').  
            replace(/\..+/, '');
        // if (!(this.ngayvagio > formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US'))) {
        //     Swal.fire({
        //         icon: 'error',
        //         text: 'ng??y gi??? ?????t s??n tr?????c ng??y gi??? hi???n t???i',
        //     })
        // }
        console.log(datsan,a);
        Swal.fire({
            html: '<h1 style="color: #41c04d;">B???n c?? mu???n x??a ?????t s??n n??y kh??ng</h1><table style="width: 100%;" border="1"><tr><td>t??n qu??n </td><td>' + datsan.nameQuan + '</td></tr><tr><td>?????a ch??? qu??n </td><td>' + datsan.addressQuan + '</td></tr><tr><td>S??? ??i???n Tho???i Qu??n </td><td>' + datsan.phoneQuan + '</td></tr><tr><td>t??n s??n </td><td>' + datsan.nameSan + '</td></tr><tr><td>s??? ng?????i </td><td>' + datsan.numberpeople + '</td></tr><tr><td>s??? ti???n thanh to??n</td><td>' + datsan.price + '</td></tr><tr><td>gi??? ?????t</td><td>' + datsan.time + '</td></tr><tr><td>x??c nh???n ch??? qu??n</td><td>' + datsan.xacnhan + '</td></tr></table>',
            showCancelButton: true,
            confirmButtonText: `X??a ?????t s??n`,
        }).then(result => {
            if (result.value) {

                this.dashboardService.deleteDatSan(datsan.id).subscribe(data => {
                    if (data.status) {
                        Swal.fire({
                            icon: 'success',
                            title: 'X??a th??nh c??ng',
                            showConfirmButton: false,
                            timer: 1500
                        });       
                        this.getListDatSanByUserToken();
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: data.message,
                        })
                    }
                });
            }
        });

        
    }
}
