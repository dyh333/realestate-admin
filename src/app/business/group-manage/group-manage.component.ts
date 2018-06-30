import { Component, OnInit } from '@angular/core';
import { GroupManageService } from './services';

@Component({
  selector: 'app-group-manage',
  templateUrl: './group-manage.component.html',
  styleUrls: ['./group-manage.component.scss'],
})
export class GroupManageComponent implements OnInit {
  // 楼盘数据
  displayGroupList = [];
  // 新增或者编辑的modal是否可用
  isCreateOrUpdataModalVisible: boolean = false;
  // 是否新增楼盘
  isCreate: boolean = true;
  // 楼盘数据
  groupItem: Object;
  // 删除功能的modal是否可用
  isDelModalVisible: boolean = false;
  // 要删除的数据列表
  toDelDataList = [];
  // 是否编辑楼盘
  isEdited: boolean = false;
  // 刷新楼盘数据
  refreshGroup: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  /** 增加楼盘
   *
   *
   * @memberof GroupManageComponent
   */
  createAGroup(): void {
    this.groupItem = {
      Name: null,
      BuildingCount: null,
      RoomCount: null,
      CourtName: null,
    };
    this.isCreate = true;
    this.isEdited = false;
    this.isCreateOrUpdataModalVisible = true;
  }

  /** 编辑指定的楼盘
   * 
   *
   * @param {Object} item
   * @memberof GroupManageComponent
   */
  editTheGroup(item: Object): void {
    this.groupItem = item;
    this.isCreate = false;
    this.isEdited = true;
    this.isCreateOrUpdataModalVisible = true;
  }

  /** 新增或者编辑楼盘数据
   *
   *
   * @param {Object} groupItem
   * @memberof GroupManageComponent
   */
  createOrUpdateTheGroupItem(groupItem: Object): void {
    this.refreshGroup = true;
  }

  /** 删除选中的楼盘
   *
   *
   * @memberof GroupManageComponent
   */
  deleteGroups(): void {
    this.toDelDataList = this.displayGroupList.filter((item) => { return item.checked === true; });
    this.isDelModalVisible = true;
    this.isEdited = false;
  }

  /** 是否删除数据
   *
   *
   * @param {boolean} isDelete
   * @memberof GroupManageComponent
   */
  isToDelete(isDelete: boolean): void {
    this.refreshGroup = true;
  }

}
