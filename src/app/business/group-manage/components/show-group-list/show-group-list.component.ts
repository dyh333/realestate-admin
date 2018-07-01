import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupManageService } from '../../services';

@Component({
  selector: 'app-show-group-list',
  templateUrl: './show-group-list.component.html',
  styleUrls: ['./show-group-list.component.scss']
})
export class ShowGroupListComponent implements OnInit {
  // 是否进行了编辑功能
  @Input() set isEdited(isEdited: boolean) {
    // 如果不是信息编辑，即新增或者删除时，
    // 那么刷新时获取的数据从第一页开始
    if (!isEdited) {
      this.refreshCondition.params.pageNo = 1;
    }
  }
  // 是否需要刷新
  @Input() set refresh(refresh: boolean) {
    if (refresh) {
      this.refreshGroupList();
      this.refreshChange.emit(false);
    }
  }
  // 
  @Output() refreshChange = new EventEmitter<boolean>();
  // 获取楼盘数据
  @Output() groupListChange = new EventEmitter<Object[]>();
  // 选中楼盘
  @Output() choosedGroup = new EventEmitter<Object>();
  // 查询到的总数量
  groupTotal: number = 120;
  // 楼盘数据
  groupList: Object[] = [];
  // 所有都被选中
  allChecked = false;
  // 是否不确定的
  indeterminate = false;
  // 显示的数据
  displayData = [];
  // 刷新的条件
  refreshCondition = {
    url: null,
    params: {
      name: null,
      pageNo: null,
      pageSize: null
    }
  };
  // 是否正在加载
  isLoading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: GroupManageService,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { config }) => {
      const config = data.config;
      this.refreshCondition = config.refreshCondition;
      this.refreshGroupList();
    });
  }

  /** 刷新楼盘列表
   *
   *
   * @memberof ShowGroupListComponent
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
    this.refreshCondition.params.pageNo = pageNo;
  }

}
