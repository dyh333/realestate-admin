import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input
} from '@angular/core';

@Component({
  selector: 'app-show-group-list',
  templateUrl: './show-group-list.component.html',
  styleUrls: ['./show-group-list.component.scss']
})
export class ShowGroupListComponent implements OnInit {
  // 查询到的总数量
  @Input() groupTotal: number = 120;
  // 楼盘数据
  @Input() groupList: Object[];
  // 获取楼盘数据
  @Output() groupListChange = new EventEmitter<Object[]>();
  // 选中楼盘
  @Output() choosedGroup = new EventEmitter<Object>();
  // 页数改变时
  @Output() pageNoChange = new EventEmitter<number>();
  // 所有都被选中
  allChecked = false;
  // 是否不确定的
  indeterminate = false;
  // 显示的数据
  displayData = [];

  constructor() { }

  ngOnInit() {
  }

  /** 当前的表格中的数据改变时
   *
   *
   * @param {Array<Object>} $event
   * @memberof ShowGroupListComponent
   */
  currentPageDataChange($event: Array<Object>): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  /** 刷新表格数据
   *
   *
   * @memberof ShowGroupListComponent
   */
  refreshStatus(): void {
    const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.groupListChange.emit([...this.displayData]);
  }

  /** 选中表格中的所有数据
   *
   *
   * @param {boolean} value
   * @memberof ShowGroupListComponent
   */
  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  /** 选择一个楼盘数据
   *
   *
   * @param {Object} groupItem 楼盘项
   * @memberof ShowGroupListComponent
   */
  chooseTheGroup(groupItem: Object): void {
    this.choosedGroup.emit(groupItem);
  }

  /** 更改页数
   *
   *
   * @param {number} pageNo
   * @memberof ShowGroupListComponent
   */
  changePageNo(pageNo: number): void {
    this.pageNoChange.emit(pageNo);
  }

}
