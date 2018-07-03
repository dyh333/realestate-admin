import { Component, OnInit } from '@angular/core';
import { NzTreeNode } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { ContractManageService } from './servicves';

@Component({
  selector: 'app-contract-manage',
  templateUrl: './contract-manage.component.html',
  styleUrls: ['./contract-manage.component.scss']
})
export class ContractManageComponent implements OnInit {

  nodes = [];

  displayContractList = [];
  // 新增或者编辑的modal是否可用
  isCreateOrUpdataModalVisible: boolean = false;
  // 是否新增合同
  isCreate: boolean = true;
  // 合同数据
  contractItem: Object;
  // 删除功能的modal是否可用
  isDelModalVisible: boolean = false;
  // 要删除的数据列表
  toDelDataList = [];
  // 是否编辑楼盘
  isEdited: boolean = false;
  // 刷新楼盘数据
  refreshContract: boolean = false;

  getGroupsUrl: string;

  getGroupBuildingsUrl: string;
  // 
  getBuildingRoomsUrl: string;

  choosedGroupGuid: string;

  choosedBuildName: string;

  choosedRoomName: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ContractManageService,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { config }) => {
      const config = data.config;
      this.getGroupsUrl = config['getGroupsUrl'];
      this.getGroupBuildingsUrl = config['getGroupBuildingsUrl'];
      this.getBuildingRoomsUrl = config['getBuildingRoomsUrl'];
      this.getGroups();
    });
  }

  /** 获取楼盘数据
   *
   *
   * @memberof ContractManageComponent
   */
  getGroups(): void {
    this.service.getGroups(this.getGroupsUrl).subscribe(callback => {
      const groups = callback['groups'];
      for (const item of groups) {
        const node = new NzTreeNode({
          title: item['CourtName'],
          key: item['Guid'],
          children: [],
          extraInfo: {
            sign: 'group',
          }
        });
        this.nodes.push(node);
      }
    });
  }

  /** 获取楼盘下幢的数据
   *
   *
   * @param {string} groupGuid
   * @param {*} treeNode
   * @memberof ContractManageComponent
   */
  getGroupBuildings(groupGuid: string, treeNode: any): void {
    this.choosedGroupGuid = groupGuid;
    this.choosedBuildName = null;
    this.choosedRoomName = null;
    this.refreshContract = true;
    this.service.getGroupBuildings(this.getGroupBuildingsUrl, groupGuid).subscribe(callback => {
      const buildings = callback['buildings'];
      if (buildings && buildings.length > 0 && treeNode.node.getChildren().length === 0 && treeNode.node.isExpanded) {
        const treeChildren = [];
        for (const item of buildings) {
          treeChildren.push({
            title: item['BuildingName'],
            key: item['BuildingName'],
            extraInfo: {
              sign: 'building',
              groupGuid: groupGuid,
            }
          });
        }
        treeNode.node.addChildren(treeChildren);
      }
    });
  }

  /** 获取幢下户室的数据
   *
   *
   * @param {string} groupGuid
   * @param {string} buildingName
   * @param {*} treeNode
   * @memberof ContractManageComponent
   */
  getBuildingRooms(groupGuid: string, buildingName: string, treeNode: any): void {
    this.service.getBuildingRooms(this.getBuildingRoomsUrl, groupGuid, buildingName).subscribe(callback => {
      const rooms = callback['rooms'];
      if (rooms && rooms.length > 0 && treeNode.node.getChildren().length === 0 && treeNode.node.isExpanded) {
        const treeChildren = [];
        for (const item of rooms) {
          treeChildren.push({
            title: item['RoomName'],
            key: item['RoomName'],
            isLeaf: true,
            extraInfo: {
              sign: 'room',
              groupGuid: groupGuid,
              buildingName: buildingName,
            }
          });
        }
        treeNode.node.addChildren(treeChildren);
      }
    });
  }

  /** 鼠标操作tree组件的操作
   *
   *
   * @param {string} name
   * @param {*} e
   * @memberof ContractManageComponent
   */
  mouseAction(name: string, e: any): void {
    let { node: { origin: { key, extraInfo } } } = e;
    const sign = extraInfo['sign'];
    if ('group' === sign) {
      if ('expand' === name) {
        this.getGroupBuildings(key, e);
      } else if ('click' === name) {
      }
      this.choosedGroupGuid = key;
      this.choosedBuildName = null;
      this.choosedRoomName = null;
      this.refreshContract = true;
    } else if ('building' === sign) {
      if ('expand' === name) {
        this.getBuildingRooms(extraInfo['groupGuid'], key, e);
      } else if ('click' === name) {
      }
      this.choosedGroupGuid = extraInfo['groupGuid'];
      this.choosedBuildName = key;
      this.choosedRoomName = null;
      this.refreshContract = true;
    } else if ('room' === sign) {
      this.choosedGroupGuid = extraInfo['groupGuid'];
      this.choosedBuildName = extraInfo['buildingName'];
      this.choosedRoomName = key;
      this.refreshContract = true;
    }
  }

  /** 新增一条合同信息
   *
   *
   * @memberof ContractManageComponent
   */
  createAContract(): void {
    this.contractItem = {
      Name: null,
      BuildingName: null,
      RoomName: null,
      Address: null,
      LandArea: null,
      RoomArea: null,
      Price: null,
      IsLoan: 1,
      LoanBank: null,
      AgencyFee: null,
      IsHavePark: 1,
      Progress: 1,
      PaperState: 1,
      PaperStateRemark: null,
      IsEmergent: 0,
      EmergentFee: null,
    };
    this.isCreate = true;
    this.isEdited = false;
    this.isCreateOrUpdataModalVisible = true;
  }

  /** 编辑指定合同信息
   *
   *
   * @param {Object} item
   * @memberof ContractManageComponent
   */
  editTheContract(item: Object): void {
    this.contractItem = item;
    this.isCreate = false;
    this.isEdited = true;
    this.isCreateOrUpdataModalVisible = true;
  }

  /** 新增或者编辑合同信息
   *
   *
   * @param {Object} contractItem
   * @memberof ContractManageComponent
   */
  createOrUpdateTheContractItem(contractItem: Object): void {
    this.refreshContract = true;
  }

  /** 删除合同信息
   *
   *
   * @memberof ContractManageComponent
   */
  deleteContracts(): void {
    this.toDelDataList = this.displayContractList.filter((item) => { return item.checked === true; });
    this.isDelModalVisible = true;
    this.isEdited = false;
  }

  /** 是否删除
   *
   *
   * @param {boolean} isDelete
   * @memberof ContractManageComponent
   */
  isToDelete(isDelete: boolean): void {
    this.refreshContract = true;
  }

  /** 导入合同数据
   *
   *
   * @memberof ContractManageComponent
   */
  importContracts(): void {

  }

}
