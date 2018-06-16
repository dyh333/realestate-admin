import { Component, OnInit } from '@angular/core';
import { NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'app-contract-manage',
  templateUrl: './contract-manage.component.html',
  styleUrls: ['./contract-manage.component.scss']
})
export class ContractManageComponent implements OnInit {

  contractTotal: number = 120;

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

  allChecked = false;
  indeterminate = false;
  displayData = [];
  data = [
    {
      name: '中南世纪城二期',
      buildingName: '32',
      roomName: '120',
      address: '中南世纪城二期',
      landArea: '32',
      roomArea: '120',
      price: '120',
      isLoan: '是',
      loanBank: '建设银行',
      agencyFee: '500',
      isHavePark: '否',
      progress: '资料提交',
      checked: false,
      disabled: false
    },
    {
      name: '中南世纪城二期',
      buildingName: '32',
      roomName: '120',
      address: '中南世纪城二期',
      landArea: '32',
      roomArea: '120',
      price: '120',
      isLoan: '是',
      loanBank: '建设银行',
      agencyFee: '500',
      isHavePark: '否',
      progress: '资料提交',
      checked: false,
      disabled: false
    },
    {
      name: '中南世纪城二期',
      buildingName: '32',
      roomName: '120',
      address: '中南世纪城二期',
      landArea: '32',
      roomArea: '120',
      price: '120',
      isLoan: '是',
      loanBank: '建设银行',
      agencyFee: '500',
      isHavePark: '否',
      progress: '资料提交',
      checked: false,
      disabled: false
    },
    {
      name: '中南世纪城二期',
      buildingName: '32',
      roomName: '120',
      address: '中南世纪城二期',
      landArea: '32',
      roomArea: '120',
      price: '120',
      isLoan: '是',
      loanBank: '建设银行',
      agencyFee: '500',
      isHavePark: '否',
      progress: '资料提交',
      checked: false,
      disabled: false
    },
    {
      name: '中南世纪城二期',
      buildingName: '32',
      roomName: '120',
      address: '中南世纪城二期',
      landArea: '32',
      roomArea: '120',
      price: '120',
      isLoan: '是',
      loanBank: '建设银行',
      agencyFee: '500',
      isHavePark: '否',
      progress: '资料提交',
      checked: false,
      disabled: false
    },
    {
      name: '中南世纪城二期',
      buildingName: '32',
      roomName: '120',
      address: '中南世纪城二期',
      landArea: '32',
      roomArea: '120',
      price: '120',
      isLoan: '是',
      loanBank: '建设银行',
      agencyFee: '500',
      isHavePark: '否',
      progress: '资料提交',
      checked: false,
      disabled: false
    },
    {
      name: '中南世纪城二期',
      buildingName: '32',
      roomName: '120',
      address: '中南世纪城二期',
      landArea: '32',
      roomArea: '120',
      price: '120',
      isLoan: '是',
      loanBank: '建设银行',
      agencyFee: '500',
      isHavePark: '否',
      progress: '资料提交',
      checked: false,
      disabled: false
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  mouseAction(name: string, e: any): void {
    console.log(name, e);
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
