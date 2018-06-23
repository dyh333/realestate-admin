import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GroupManageService {

    constructor(
        private http: HttpClient,
    ) { }

    /** 获取楼盘列表书
     *
     *
     * @param {Object} condition
     * @returns {Observable<Object>}
     * @memberof GroupManageService
     */
    getGroup(condition: Object): Observable<Object> {
        const params = condition['params'];
        const url = `${condition['url']}?name=${params['name']}&offset=${params['pageNo']}&limit=${params['pageSize']}`;
        return this.http.get(url);
    }

}
