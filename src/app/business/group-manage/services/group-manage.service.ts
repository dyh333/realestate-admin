import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GroupManageService {

    constructor(
        private http: HttpClient,
    ) { }

    resolve() {
        const configUrl = './config/group-manage.config.json';
        return this.http.get(configUrl);
    }

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
     * @param {Object} groupItem 数据项
     * @param {string} createGroupUrl 新增的api接口地址
     * @returns {Observable<Object>}
     * @memberof GroupManageService
     */
    createAGroup(groupItem: Object, createGroupUrl: string): Observable<Object> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return this.http.post(createGroupUrl, groupItem, httpOptions);
    }

    /** 更新楼盘
     *
     *
     * @param {Object} groupItem 数据项
     * @param {string} updateGroupUrl 编辑的api接口地址
     * @returns {Observable<Object>}
     * @memberof GroupManageService
     */
    updateTheGroup(groupItem: Object, updateGroupUrl: string): Observable<Object> {
        const updateUrl = `${updateGroupUrl}${groupItem['Guid']}`;
        Reflect.deleteProperty(groupItem, 'Guid');
        Reflect.deleteProperty(groupItem, 'checked');
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return this.http.put(updateUrl, groupItem, httpOptions);
    }

    /** 删除楼盘
     *
     *
     * @param {Object[]} groups 楼盘数组
     * @param {string} deleteGroupsUrl 删除的api接口地址
     * @returns {Observable<any>}
     * @memberof GroupManageService
     */
    deleteGroups(groups: Object[], deleteGroupsUrl: string): Observable<any> {
        let deleteUrl = deleteGroupsUrl,
            count = 0;;
        for (const item of groups) {
            deleteUrl = `${deleteUrl}${item['Guid']}${count < groups.length - 1 ? ',' : ''}`;
            count++;
        }
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return this.http.delete(deleteUrl, httpOptions);
    }

}
