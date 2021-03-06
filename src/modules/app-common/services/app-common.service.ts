import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { environment } from 'environments/environment';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export class AppCommonService {
    constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {}
    public httpOptions = {
        headers: new HttpHeaders({
            // 'token': this.storage.get('token')
            'token': JSON.parse(this.storage.get('token')),
        }),
    };
    getToken(){
        return this.storage.get('token');
    }
    setToken(token: string) {
        this.storage.set('token', JSON.stringify(token));

        this.httpOptions = {
            headers: new HttpHeaders({
                'token': JSON.parse(this.storage.get('token')),
            }),
        };
    }

    getAppCommon$(): Observable<{}> {
        return of({});
    }
    errorHandler(error: HttpErrorResponse) {
        return throwError(error.message || 'Serve error');
    }
}
