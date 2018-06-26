import { Component, OnInit } from '@angular/core';
import { GroupManageService } from './services';

@Component({
  selector: 'app-group-manage',
  templateUrl: './group-manage.component.html',
  styleUrls: ['./group-manage.component.scss'],
  providers: [GroupManageService]
})
export class GroupManageComponent implements OnInit {
  // 刷新的条件
  refreshCondition = {
    url: 'http://122.112.247.228:3000/tcrs/v1/group/groups',
    params: {
      name: '',
      pageNo: 1,
      pageSize: 10
    }
  };

  createGroupUrl: string = 'http://122.112.247.228:3000/tcrs/v1/group/group';

  updateGroupUrl: string = 'http://122.112.247.228:3000/tcrs/v1/group/group/';

  deleteGroupUrl: string = 'http://122.112.247.228:3000/tcrs/v1/group/group/';
  // 楼盘总数量
  groupTotal: number = 0;
  // 楼盘数据
  groupList = [];
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
  // 是否正在加载
  isLoading: boolean = false;

  constructor(
    private service: GroupManageService,
  ) { }

  ngOnInit() {
    this.refreshGroupList();
  }

  /** 刷新楼盘列表
   *
   *
   * @memberof GroupManageComponent
   */
  refreshGroupList(): void {
    this.isLoading = true;
    this.service.getGroup(this.refreshCondition).subscribe((callback: any) => {
      let { groups, meta: { counts } } = callback;
      this.groupTotal = counts;
      this.groupList = groups;
      this.isLoading = false;
    });
  }

  /** 更改页数
   *
   *
   * @param {number} pageNo
   * @memberof GroupManageComponent
   */
  changePageNo(pageNo: number): void {
    this.refreshCondition.params.pageNo = pageNo;
    // this.refreshGroupList();
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
    this.isCreateOrUpdataModalVisible = true;
  }

  /** 编辑指定的楼盘
   * 
   *
   * @param {*} item
   * @memberof GroupManageComponent
   */
  editTheGroup(item): void {
    this.groupItem = item;
    this.isCreate = false;
    this.isCreateOrUpdataModalVisible = true;
  }

  /** 新增或者编辑楼盘数据
   *
   *
   * @param {Object} groupItem
   * @memberof GroupManageComponent
   */
  addOrUpdateTheGroupItem(groupItem: Object): void {
    this.isLoading = true;
    // todo: 根据情况，新增或者编辑楼盘数据
    if (this.isCreate) {
      this.service.createAGroup(groupItem, this.createGroupUrl).subscribe(callback => {
        console.log(callback);
        this.isLoading = false;
        // 刷新列表，从第一页开始
        this.refreshCondition.params.pageNo = 1;
        this.refreshGroupList();
      });
    } else {
      this.service.updateTheGroup(groupItem, this.updateGroupUrl).subscribe(callback => {
        console.log(callback);
        this.isLoading = false;
        // 刷新列表，显示当前页，不用从第一页开始
        this.refreshGroupList();
      });
    }
  }

  /** 删除选中的楼盘
   *
   *
   * @memberof GroupManageComponent
   */
  deleteGroups(): void {
    this.toDelDataList = this.displayGroupList.filter((item) => { return item.checked === true; });
    this.isDelModalVisible = true;
  }

  /** 是否删除数据
   *
   *
   * @param {boolean} isDelete
   * @memberof GroupManageComponent
   */
  isToDelete(isDelete: boolean): void {
    if (isDelete) {
      this.isLoading = true;
      this.service.deleteGroups(this.toDelDataList, this.deleteGroupUrl).subscribe(callback => {
        console.log(callback);
        this.isLoading = false;
        // tode: 删除成功后，需要更新列表中的数据
        // 回到第一页
        this.refreshCondition.params.pageNo = 1;
        // 刷新数据
        this.refreshGroupList();
      });
    }
  }

}
