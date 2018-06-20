import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group-manage',
  templateUrl: './group-manage.component.html',
  styleUrls: ['./group-manage.component.scss']
})
export class GroupManageComponent implements OnInit {
  
  groupTotal: number = 120;
  
  allChecked = false;
  indeterminate = false;
  displayData = [];
  data = [
    {
      name: '中南世纪城二期',
      buildingCount: '32',
      roomCount: '120',
      courtName: '中南花园',
      checked: false,
      disabled: false
    },
    {
      name: '中南世纪城二期',
      buildingCount: '32',
      roomCount: '120',
      courtName: '中南花园',
      checked: false,
      disabled: false
    },
    {
      name: '中南世纪城二期',
      buildingCount: '32',
      roomCount: '120',
      courtName: '中南花园',
      checked: false,
      disabled: false
    },
    {
      name: '中南世纪城二期',
      buildingCount: '32',
      roomCount: '120',
      courtName: '中南花园',
      checked: false,
      disabled: false
    },
    {
      name: '中南世纪城二期',
      buildingCount: '32',
      roomCount: '120',
      courtName: '中南花园',
      checked: false,
      disabled: false
    },
    {
      name: '中南世纪城二期',
      buildingCount: '32',
      roomCount: '120',
      courtName: '中南花园',
      checked: false,
      disabled: false
    },
    {
      name: '中南世纪城二期',
      buildingCount: '32',
      roomCount: '120',
      courtName: '中南花园',
      checked: false,
      disabled: false
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  currentPageDataChange($event: Array<{ name: string; age: number; address: string; checked: boolean; disabled: boolean; }>): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

}
