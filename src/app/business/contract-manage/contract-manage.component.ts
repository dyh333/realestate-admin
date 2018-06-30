import { Component, OnInit } from '@angular/core';
import { NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'app-contract-manage',
  templateUrl: './contract-manage.component.html',
  styleUrls: ['./contract-manage.component.scss']
})
export class ContractManageComponent implements OnInit {

  expandKeys = ['1001', '1002'];
  nodes = [
    new NzTreeNode({
      title: '小区1',
      key: '1001',
      children: [
        {
          title: '1幢',
          key: '10001',
          isLeaf: true,
        },
        {
          title: '2幢',
          key: '10002',
          isLeaf: true,
        }
      ]
    }),
    new NzTreeNode({
      title: '小区2',
      key: '1002',
      children: [
        {
          title: '50幢',
          key: '10021',
          isLeaf: true,
        },
        {
          title: '51幢',
          key: '10022',
          isLeaf: true,
        }
      ]
    })
  ];

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

  constructor() { }

  ngOnInit() {
  }

  mouseAction(name: string, e: any): void {
    console.log(name, e);
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
      IsLoan: null,
      LoanBank: null,
      AgencyFee: null,
      IsHavePark: null,
      FillinBuyerGuid: null,
      Progress: null,
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
  editTheContract(item:Object): void {
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

}
