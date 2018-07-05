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

    /** 获取楼盘
     *
     *
     * @param {string} url
     * @returns {Observable<Object>}
     * @memberof ContractManageService
     */
    getGroups(url: string): Observable<Object> {
        return this.http.get(url);
    }

    /** 获取楼盘下的幢
     *
     *
     * @param {string} url
     * @param {string} groupGuid
     * @returns {Observable<Object>}
     * @memberof ContractManageService
     */
    getGroupBuildings(url: string, groupGuid: string): Observable<Object> {
        const getGroupBuildingsUrl = url.replace('{groupGuid}', groupGuid);
        return this.http.get(getGroupBuildingsUrl);
    }

    /** 获取幢下面的户室
     *
     *
     * @param {string} url
     * @param {string} groupGuid
     * @param {string} buildingName
     * @returns {Observable<Object>}
     * @memberof ContractManageService
     */
    getBuildingRooms(url: string, groupGuid: string, buildingName: string): Observable<Object> {
        const getBuildingRoomsUrl = url.replace('{groupGuid}', groupGuid).replace('{buildingName}', buildingName);
        return this.http.get(getBuildingRoomsUrl);
    }

    /** 根据条件获取合同列表
     *
     *
     * @param {Object} condition
     * @returns {Observable<Object>}
     * @memberof ContractManageService
     */
    getContracts(condition: Object, groupGuid: string): Observable<Object> {
        const params = condition['params'];
        const url = `${condition['url']}${groupGuid}?buildingname=${params['buildingname']}&offset=${params['pageNo']}&limit=${params['pageSize']}`;
        return this.http.get(url);
    }

    /** 获取合同的详细信息
     *
     *
     * @param {string} url
     * @param {string} groupGuid
     * @param {string} buildingName
     * @param {string} roomName
     * @returns {Observable<Object>}
     * @memberof ContractManageService
     */
    getTheContractDetailInfo(url: string, groupGuid: string, buildingName: string, roomName: string): Observable<Object> {
        const detailInfoUrl = url.replace('{groupGuid}', groupGuid).replace('{buildingName}', buildingName).replace('{roomName}', roomName);
        return this.http.get(detailInfoUrl);
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
