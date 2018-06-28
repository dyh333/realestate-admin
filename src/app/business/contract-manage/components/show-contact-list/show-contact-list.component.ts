import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-show-contact-list',
  templateUrl: './show-contact-list.component.html',
  styleUrls: ['./show-contact-list.component.scss']
})
export class ShowContactListComponent implements OnInit {

  @Input() contractTotal: number = 0;

  @Input() contractList = [];
  // 获取合同数据
  @Output() contractListChange = new EventEmitter<Object[]>();
  // 选中合同
  @Output() choosedContract = new EventEmitter<Object>();
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

  currentPageDataChange($event: Array<Object>): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.contractListChange.emit([...this.displayData]);
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  chooseTheGroup(groupItem: Object): void {
    this.choosedContract.emit(groupItem);
  }

  changePageNo(pageNo: number): void {
    this.pageNoChange.emit(pageNo);
  }

}
