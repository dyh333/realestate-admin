import { Component, OnInit } from '@angular/core';
import { GroupManageService } from './group-manage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-group-manage',
  templateUrl: './group-manage.component.html',
  styleUrls: ['./group-manage.component.scss'],
  providers: [GroupManageService]
})
export class GroupManageComponent implements OnInit {
  // 查询到的总数量
  groupTotal: number = 120;
  // 所有都被选中
  allChecked = false;
  // 是否不确定的
  indeterminate = false;
  // 显示的数据
  displayData = [];
  // 数据
  data = [
    {
      Name: '中南世纪城二期',
      BuildingCount: '32',
      RoomCount: '120',
      CourtName: '中南花园',
      checked: false,
      disabled: false
    }, {
      Name: '中南世纪城二期',
      BuildingCount: '32',
      RoomCount: '120',
      CourtName: '中南花园',
      checked: false,
      disabled: false
    }, {
      Name: '中南世纪城二期',
      BuildingCount: '32',
      RoomCount: '120',
      CourtName: '中南花园',
      checked: false,
      disabled: false
    }, {
      Name: '中南世纪城二期',
      BuildingCount: '32',
      RoomCount: '120',
      CourtName: '中南花园',
      checked: false,
      disabled: false
    }, {
      Name: '中南世纪城二期',
      BuildingCount: '32',
      RoomCount: '120',
      CourtName: '中南花园',
      checked: false,
      disabled: false
    }, {
      Name: '中南世纪城二期',
      BuildingCount: '32',
      RoomCount: '120',
      CourtName: '中南花园',
      checked: false,
      disabled: false
    }, {
      Name: '中南世纪城二期',
      BuildingCount: '32',
      RoomCount: '120',
      CourtName: '中南花园',
      checked: false,
      disabled: false
    }
  ];
  // 新增或者编辑的modal是否可用
  isAddOrUpdataModalVisible: boolean = false;
  // 新增或者编辑的modal的标题
  theModalTitle: string;
  // 是否新增楼盘
  isAdd: boolean = true;
  // 检验表单
  validateForm: FormGroup;
  // 删除功能的modal是否可用
  isDelModalVisible:boolean = false;
  // 要删除的数据列表
  toDelDataList=[];
  
  constructor(
    private service: GroupManageService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    const condition = {
      url: 'http://122.112.247.228:3000/tcrs/v1/group/groups',
      params: {
        name: '',
        pageNo: 1,
        pageSize: 10
      }
    }
    // this.service.getGroup(condition).subscribe(callback => {
    //   console.log(callback);
    // });
  }
  
  /** 当前的表格中的数据改变时
   *
   *
   * @param {Array<{ name: string; age: number; address: string; checked: boolean; disabled: boolean; }>} $event
   * @memberof GroupManageComponent
   */
  currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; disabled: boolean; }>): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  /** 刷新表格数据
   *
   *
   * @memberof GroupManageComponent
   */
  refreshStatus(): void {
    const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  /** 选中表格中的所有数据
   *
   *
   * @param {boolean} value
   * @memberof GroupManageComponent
   */
  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  /** 增加楼盘
   *
   *
   * @memberof GroupManageComponent
   */
  addAGroup(): void {
    const dataItem = {
      Name: null,
      BuildingCount: null,
      RoomCount: null,
      CourtName: null,
    };
    this.initForm(dataItem);
    this.theModalTitle = '新增楼盘';
    this.isAdd = true;
    this.isAddOrUpdataModalVisible = true;
  }

  /** 编辑指定的楼盘
   * 
   *
   * @param {*} item
   * @memberof GroupManageComponent
   */
  editTheGroup(item): void {
    this.initForm(item);
    this.theModalTitle = item['Name'];
    this.isAdd = false;
    this.isAddOrUpdataModalVisible = true;
  }

  /** 删除选中的楼盘
   *
   *
   * @memberof GroupManageComponent
   */
  deleteGroups(): void {
    this.toDelDataList = this.displayData.filter((item) => { return item.checked === true; });
    this.isDelModalVisible = true;
   
  }

  /** 确认删除功能的modal中的内容
   *
   *
   * @memberof GroupManageComponent
   */
  confirmTheDelModal():void{
    if(this.toDelDataList.length>0){
      // todo:删除选中的数据
    }
    this.closeTheDelModal();
  }

  /** 关闭删除功能的modal
   *
   *
   * @memberof GroupManageComponent
   */
  closeTheDelModal():void{
    this.isDelModalVisible = false;
  }

  /** 提交modal中的数据
   *
   *
   * @memberof GroupManageComponent
   */
  submitTheModal(): void {
    this.closeTheModal();
  }

  /** 关闭modal
   *
   *
   * @memberof GroupManageComponent
   */
  closeTheModal(): void {
    this.isAddOrUpdataModalVisible = false;
  }

  /** 检查表单数据
   *
   *
   * @memberof GroupManageComponent
   */
  checkForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  /** 初始化表单
   *
   *
   * @param {Object} dataItem
   * @memberof GroupManageComponent
   */
  initForm(dataItem: Object): void {
    this.validateForm = this.fb.group({
      Name: [dataItem['Name'], [Validators.required]],
      BuildingCount: [dataItem['BuildingCount'], [Validators.required]],
      RoomCount: [dataItem['RoomCount'], [Validators.required,]],
      CourtName: [dataItem['CourtName'], [Validators.required]],
    });
  }

}
