import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ContractManageService {

    constructor(
        private http: HttpClient,
    ) { }

    resolve() {
        const configUrl = './config/contract-manage.config.json';
        return this.http.get(configUrl);
    }

    /** 根据条件获取合同列表
     *
     *
     * @param {Object} condition
     * @returns {Observable<Object>}
     * @memberof ContractManageService
     */
    getContracts(condition: Object): Observable<Object> {
        const params = condition['params'];
        const url = `${condition['url']}?name=${params['name']}&offset=${params['pageNo']}&limit=${params['pageSize']}`;
        return this.http.get(url);
    }

    /** 新增一条合同信息
     *
     *
     * @param {Object} contractItem
     * @param {string} createContractUrl
     * @returns {Observable<Object>}
     * @memberof ContractManageService
     */
    createAContract(contractItem: Object, createContractUrl: string): Observable<Object> {
        return this.createADataItem(contractItem, createContractUrl);
    }

    /** 更新指定的合同信息
     *
     *
     * @param {Object} contractItem
     * @param {string} updateContractUrl
     * @returns {Observable<Object>}
     * @memberof ContractManageService
     */
    updateTheContract(contractItem: Object, updateContractUrl: string): Observable<Object> {
        return this.updateTheDataItem(contractItem, updateContractUrl);
    }

    /** 删除选中的合同信息
     *
     *
     * @param {Object[]} contracts
     * @param {string} deleteContractsUrl
     * @returns {Observable<any>}
     * @memberof ContractManageService
     */
    deleteContracts(contracts: Object[], deleteContractsUrl: string): Observable<any> {
        return this.deleteDataItems(contracts, deleteContractsUrl);
    }

    /** 获取买受人信息列表
     *
     *
     * @param {string} getUrl
     * @param {string} contractGuid
     * @returns {Observable<Object>}
     * @memberof ContractManageService
     */
    getBuyers(getUrl: string, contractGuid: string): Observable<Object> {
        const url = `${getUrl}/${contractGuid}`;
        return this.http.get(url);
    }

    /** 新增一个买受人信息
     *
     *
     * @param {Object} buyerItem
     * @param {string} createUrl
     * @returns {Observable<Object>}
     * @memberof ContractManageService
     */
    createABuyer(buyerItem: Object, createUrl: string): Observable<Object> {
        return this.createADataItem(buyerItem, createUrl);
    }

    /** 跟新指定的买受人信息
     *
     *
     * @param {Object} buyerItem
     * @param {string} updateUrl
     * @returns {Observable<Object>}
     * @memberof ContractManageService
     */
    updateTheBuyer(buyerItem: Object, updateUrl: string): Observable<Object> {
        return this.updateTheDataItem(buyerItem, updateUrl);
    }

    /** 删除买受人
     *
     *
     * @param {Object[]} buyerItems
     * @param {*} deleteUrl
     * @returns {Observable<Object>}
     * @memberof ContractManageService
     */
    deleteBuyers(buyerItems: Object[], deleteUrl): Observable<Object> {
        return this.deleteDataItems(buyerItems, deleteUrl);
    }

    /** 新增一个数据项
     *
     *
     * @private
     * @param {Object} dataItem
     * @param {string} createUrl
     * @returns {Observable<Object>}
     * @memberof ContractManageService
     */
    private createADataItem(dataItem: Object, createUrl: string): Observable<Object> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return this.http.post(createUrl, dataItem, httpOptions);
    }

    /** 更新制定的数据项
     *
     *
     * @private
     * @param {Object} dataItem
     * @param {string} updateUrl
     * @returns {Observable<Object>}
     * @memberof ContractManageService
     */
    private updateTheDataItem(dataItem: Object, updateUrl: string): Observable<Object> {
        const url = `${updateUrl}${dataItem['Guid']}`;
        Reflect.deleteProperty(dataItem, 'Guid');
        Reflect.deleteProperty(dataItem, 'checked');
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return this.http.put(url, dataItem, httpOptions);
    }

    /** 删除数据项
     *
     *
     * @private
     * @param {Object[]} dataItems
     * @param {string} deleteUrl
     * @returns {Observable<any>}
     * @memberof ContractManageService
     */
    private deleteDataItems(dataItems: Object[], deleteUrl: string): Observable<any> {
        let url = deleteUrl,
            count = 0;;
        for (const item of dataItems) {
            url = `${url}${item['Guid']}${count < dataItems.length - 1 ? ',' : ''}`;
            count++;
        }
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return this.http.delete(url, httpOptions);
    }

}
