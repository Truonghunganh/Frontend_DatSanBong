import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from "../../services/dashboard.service";
import { environment } from './../../../../environments/environment';
import { Router } from '@angular/router';
import {AuthService} from '../../../auth/services/auth.service'
import Swal from 'sweetalert2';
@Component({
    selector: 'sb-dashboard-listquans',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard-listquans.component.html',
    styleUrls: ['dashboard-listquans.component.scss'],
})
export class DashboardListquansComponent implements OnInit {
    constructor(
        private dashboardService: DashboardService,
        private authService: AuthService,
        private router: Router,
        private changeDetectorRef: ChangeDetectorRef

        ) {}
    quans: any;
    checkquans=false;
    url = environment.url;
    urlCLU= environment.urlCLU;
    ngOnInit() {
        this.checktoken();
    }

    checktoken(){
        this.authService.checkTokenUser().subscribe(data=>{
            console.log(data);
            
            if (!data.status) {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                });
                this.router.navigate(['/auth/login']);
            }else{
                this.getListquans();
                
            }
        })
    }
    mangreview=new Array();
    getListquans() {
        this.checkquans= false;
        
        this.dashboardService.getListQuans().subscribe(data=>{
            console.log(data);
            
            if(data.status){
                this.quans=data.quans;
                for (let i = 0; i < this.quans.length; i++) {
                    this.mangreview[i]=this.taomotmangreview(Math.round(this.quans[i].review))                  
                }
                this.checkquans=true;
                this.taoquansnew(this.page);
                this.changeDetectorRef.detectChanges();
            }else{
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                })
            }
        })
    }
    hienthivitricuaminh=true;
    timkiem="";
    search() {
        this.hienthivitricuaminh=false;
        this.checkquans =false;
        this.page=1;
        this.dashboardService.searchListQuans(this.timkiem).subscribe(data=>{
            console.log(data);
            
            if (data.status) {
                this.quans = data.quans;
                for (let i = 0; i < this.quans.length; i++) {
                    this.mangreview[i] = this.taomotmangreview(Math.round(this.quans[i].review))
                }
                this.checkquans = true;
                this.taoquansnew(this.page);
                this.changeDetectorRef.detectChanges();
            }
        })   
        this.timkiem="";
    }

    taomotmangreview(review: number){
        switch (review) {
            case 0:return [false, false, false, false, false];
            case 1:return [true , false, false, false, false];
            case 2:return [true , true , false, false, false];
            case 3:return [true , true , true , false, false];
            case 4:return [true , true , true , true , false];
            case 5:return [true , true , true , true , true];
            default:
                break;
        }
    }
    page = 1;
    tongpage = 0;
    mangtrang: any;
    quansnew: any;
    taoquansnew(page: number) {
        this.quansnew = [];
        this.tongpage = this.quans.length / 3;
        let i = (page - 1) * 3;
        let k;
        if (page < this.tongpage) {
            k = 3;
        } else {
            k = this.quans.length % 3;
    
        }
        console.log(this.tongpage, i, k, page);

        for (let j = 0; j < k; j++) {
            if (j == 3) {
                break;
            }
            this.quansnew.push(this.quans[i + j]);

        }
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
    Previous() {
        if (this.page > 1) {
            this.page--;
            this.taoquansnew(this.page);
        }
    }
    Next() {
        if (this.page < this.tongpage) {
            this.page++;
            this.taoquansnew(this.page);
        }
    }
    chontrang(page: number) {
        console.log(page);

        this.page = page;
        this.taoquansnew(this.page);
    }

}
