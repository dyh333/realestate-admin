import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GroupManageService {

    constructor(
        private http: HttpClient,
    ) { }

    /** 获取楼盘列表
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

    /** 新增楼盘
     *
     *
     * @param {Object} groupItem
     * @memberof GroupManageService
     */
    addAGroup(groupItem: Object) {
        // return this.http.put();
    }

    /** 更新楼盘
     *
     *
     * @param {Object} groupItem
     * @memberof GroupManageService
     */
    updateTheGroup(groupItem: Object) {
        // return this.http.post();
    }

    /** 删除楼盘
     *
     *
     * @param {Object[]} groups
     * @memberof GroupManageService
     */
    deleteGroups(groups: Object[]) {
        // return this.http.delete();
    }

}
