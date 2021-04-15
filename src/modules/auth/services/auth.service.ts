import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {User,User1} from "../models/auth.model"
import { environment } from './../../../environments/environment';
import { AppCommonService } from './../../app-common/services/app-common.service';

@Injectable()
export class AuthService {
    constructor(
        private http: HttpClient,
        private appCommonService: AppCommonService,
        @Inject(LOCAL_STORAGE) private storage: WebStorageService,
        private router: Router
    ) {
//        this.adminSubject = new BehaviorSubject<Admin1>(JSON.parse(this.storage.get('admin')));
    }
    public httpOptions = {
        headers: new HttpHeaders({
            'Access-Control-Allow-Credentials': 'true',
        }),
    };
  //  private adminSubject: any;
    logout() {
        this.storage.set('token', JSON.stringify(1));
        this.router.navigate(['dashboard/home']);

    }
    checkToken(): Observable<any> {
        return this.http.get<any>(environment.url + '/api/v1/checkToken', this.appCommonService.httpOptions).pipe(
            tap(data => {
                of(data);
            }),
            catchError(this.appCommonService.errorHandler)
        )
    }

    searchListQuans(search: string): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/searchListQuans?search=" + search, this.appCommonService.httpOptions).pipe(
            tap(data => of(data)), catchError(this.appCommonService.errorHandler)
        );
    }

    checkTokenUser(): Observable<any>{
        return this.http.get<any>(environment.url + '/api/v1/checkTokenUser', this.appCommonService.httpOptions).pipe(
            tap(data => {
                of(data);
            }),
            catchError(this.appCommonService.errorHandler)
        )
    }
    login(user : User): Observable<any>{
        return this.http.post<any>(environment.url + '/api/v1/login', user, this.appCommonService.httpOptions).pipe(
            tap(data=>{
                console.log(data);
                if(data.status){                    

                    this.storage.set('token', JSON.stringify(data.user.token));    
                                    
                }
                of(data);
            }),
            catchError(this.appCommonService.errorHandler)
        )
    }
    Register(user: User1): Observable<any> {
       console.log(user);
       
        return this.http.post<any>(environment.url + '/api/v1/register', user).pipe(
            tap(data => {
                return of(data);
            }),
            catchError(this.appCommonService.errorHandler)
        )
    }

    setToken(token:string){
        this.storage.set('token', JSON.stringify(token));
    }

    checkTokenAdmin(): Observable<any> {
        return this.http.get<any>('http://localhost:8000/api/v1/checkTokenAdmin', this.appCommonService.httpOptions).pipe(
            tap(data => {
                of(data);
            }),
            catchError(this.appCommonService.errorHandler)
        )
    }

    getListQuans(): Observable<any> {
        return this.http.get<any>(environment.url + "/api/v1/getListQuansByTrangthaiChoHome")
            .pipe(tap(data => { of(data); },
                catchError(this.appCommonService.errorHandler)
            ));
    }
    checkTokenInnkeeper(): Observable<any> {
        return this.http.get<any>(environment.url + '/api/v1/checkTokenInnkeeper', this.appCommonService.httpOptions).pipe(
            tap(data => {
                of(data);
            }),
            catchError(this.appCommonService.errorHandler)
        )
    }

    checkTokenInnkeeperAndIdquan(idquan: number): Observable<any> {
        return this.http.post<any>(environment.url + '/api/v1/checkTokenInnkeeperAndIdquan', { "idquan": idquan }, this.appCommonService.httpOptions).pipe(
            tap(data => {
                of(data);
            }),
            catchError(this.appCommonService.errorHandler)
        )
    }

}
