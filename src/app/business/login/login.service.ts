import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {

    constructor(
        private router: Router,
    ) { }

    /** 登录
     *
     *
     * @param {string} userid 账号
     * @param {string} userpsd 密码
     * @param {Object} loginApi 登陆的api，包括登陆的接口地址等
     * @returns {Observable<any>}
     * @memberof LoginService
     */
    public verifyLogin(userid: string, userpsd: string,loginApi:Object): Observable<any> {
        return Observable.create((observer) => {
            // setTimeout(() => {
                observer.next(null);
                // 导航到默认的地址
                this.router.navigate(['/realestateAdmin' ]);
            // }, 2000);
        });
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}