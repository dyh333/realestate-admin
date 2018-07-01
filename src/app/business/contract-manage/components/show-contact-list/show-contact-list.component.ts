import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractManageService } from '../../servicves';

@Component({
  selector: 'app-show-contact-list',
  templateUrl: './show-contact-list.component.html',
  styleUrls: ['./show-contact-list.component.scss']
})
export class ShowContactListComponent implements OnInit {
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
      this.refreshContractList();
      this.refreshChange.emit(false);
    }
  }
  // 
  @Output() refreshChange = new EventEmitter<boolean>();
  // 获取合同数据
  @Output() contractListChange = new EventEmitter<Object[]>();
  // 选中合同
  @Output() choosedContract = new EventEmitter<Object>();
  // 查询到的总数量
  contractTotal: number = 0;
  // 合同数据
  contractList = [];
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
    private service: ContractManageService,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { config }) => {
      const config = data.config;
      this.refreshCondition = config.refreshCondition;
      this.refreshContractList();
    });
  }

  /** 刷新合同列表
   *
   *
   * @memberof ShowContactListComponent
   */
  refreshContractList(): void {
    this.isLoading = true;
    // this.service.getContracts(this.refreshCondition).subscribe((callback: any) => {
    //   console.log(callback);
    //   // let { groups, meta: { counts } } = callback;
    //   // this.contractTotal = counts;
    //   this.contractList = [
    //     {
    //       "Guid": "381cabf0-7ae6-11e8-8a49-b92cc9fd401b",
    //       "GroupGuid": "9245fe4a-d402-451c-b9ed-9c1a04247482",
    //       "Name": "太仓塞纳丽舍小区9幢502室买卖合同",
    //       "BuildingName": "9",
    //       "RoomName": "502",
    //       "Address": "太仓市郑和路157号",
    //       "LandArea": "10.00",
    //       "RoomArea": "109.52",
    //       "Price": "1500000.00",
    //       "IsLoan": 1,
    //       "LoanBank": "中国银行",
    //       "AgencyFee": 500,
    //       "IsHavePark": 1,
    //       "FillinBuyerGuid": "dr45fe4a-d402-451c-b9ed-8c1a04247482",
    //       "Progress": "1",
    //       "PaperState": "1",
    //       "PaperStateRemark": "测试",
    //       "IsEmergent": 0,
    //       "EmergentFee": 0,
    //       "UserGuid": "9245fe4a-d402-451c-b9ed-9c1bge247482"
    //     },
    //     {
    //       "Guid": "381cabf0-7ae6-11e8-8a49-b92cc9fd401b",
    //       "GroupGuid": "9245fe4a-d402-451c-b9ed-9c1a04247482",
    //       "Name": "太仓塞纳丽舍小区9幢502室买卖合同",
    //       "BuildingName": "9",
    //       "RoomName": "502",
    //       "Address": "太仓市郑和路157号",
    //       "LandArea": "10.00",
    //       "RoomArea": "109.52",
    //       "Price": "1500000.00",
    //       "IsLoan": 1,
    //       "LoanBank": "中国银行",
    //       "AgencyFee": 500,
    //       "IsHavePark": 1,
    //       "FillinBuyerGuid": "dr45fe4a-d402-451c-b9ed-8c1a04247482",
    //       "Progress": "1",
    //       "PaperState": "1",
    //       "PaperStateRemark": "测试",
    //       "IsEmergent": 0,
    //       "EmergentFee": 0,
    //       "UserGuid": "9245fe4a-d402-451c-b9ed-9c1bge247482"
    //     },
    //     {
    //       "Guid": "381cabf0-7ae6-11e8-8a49-b92cc9fd401b",
    //       "GroupGuid": "9245fe4a-d402-451c-b9ed-9c1a04247482",
    //       "Name": "太仓塞纳丽舍小区9幢502室买卖合同",
    //       "BuildingName": "9",
    //       "RoomName": "502",
    //       "Address": "太仓市郑和路157号",
    //       "LandArea": "10.00",
    //       "RoomArea": "109.52",
    //       "Price": "1500000.00",
    //       "IsLoan": 1,
    //       "LoanBank": "中国银行",
    //       "AgencyFee": 500,
    //       "IsHavePark": 1,
    //       "FillinBuyerGuid": "dr45fe4a-d402-451c-b9ed-8c1a04247482",
    //       "Progress": "1",
    //       "PaperState": "1",
    //       "PaperStateRemark": "测试",
    //       "IsEmergent": 0,
    //       "EmergentFee": 0,
    //       "UserGuid": "9245fe4a-d402-451c-b9ed-9c1bge247482"
    //     },
    //     {
    //       "Guid": "381cabf0-7ae6-11e8-8a49-b92cc9fd401b",
    //       "GroupGuid": "9245fe4a-d402-451c-b9ed-9c1a04247482",
    //       "Name": "太仓塞纳丽舍小区9幢502室买卖合同",
    //       "BuildingName": "9",
    //       "RoomName": "502",
    //       "Address": "太仓市郑和路157号",
    //       "LandArea": "10.00",
    //       "RoomArea": "109.52",
    //       "Price": "1500000.00",
    //       "IsLoan": 1,
    //       "LoanBank": "中国银行",
    //       "AgencyFee": 500,
    //       "IsHavePark": 1,
    //       "FillinBuyerGuid": "dr45fe4a-d402-451c-b9ed-8c1a04247482",
    //       "Progress": "1",
    //       "PaperState": "1",
    //       "PaperStateRemark": "测试",
    //       "IsEmergent": 0,
    //       "EmergentFee": 0,
    //       "UserGuid": "9245fe4a-d402-451c-b9ed-9c1bge247482"
    //     },
    //     {
    //       "Guid": "381cabf0-7ae6-11e8-8a49-b92cc9fd401b",
    //       "GroupGuid": "9245fe4a-d402-451c-b9ed-9c1a04247482",
    //       "Name": "太仓塞纳丽舍小区9幢502室买卖合同",
    //       "BuildingName": "9",
    //       "RoomName": "502",
    //       "Address": "太仓市郑和路157号",
    //       "LandArea": "10.00",
    //       "RoomArea": "109.52",
    //       "Price": "1500000.00",
    //       "IsLoan": 1,
    //       "LoanBank": "中国银行",
    //       "AgencyFee": 500,
    //       "IsHavePark": 1,
    //       "FillinBuyerGuid": "dr45fe4a-d402-451c-b9ed-8c1a04247482",
    //       "Progress": "1",
    //       "PaperState": "1",
    //       "PaperStateRemark": "测试",
    //       "IsEmergent": 0,
    //       "EmergentFee": 0,
    //       "UserGuid": "9245fe4a-d402-451c-b9ed-9c1bge247482"
    //     },
    //     {
    //       "Guid": "381cabf0-7ae6-11e8-8a49-b92cc9fd401b",
    //       "GroupGuid": "9245fe4a-d402-451c-b9ed-9c1a04247482",
    //       "Name": "太仓塞纳丽舍小区9幢502室买卖合同",
    //       "BuildingName": "9",
    //       "RoomName": "502",
    //       "Address": "太仓市郑和路157号",
    //       "LandArea": "10.00",
    //       "RoomArea": "109.52",
    //       "Price": "1500000.00",
    //       "IsLoan": 1,
    //       "LoanBank": "中国银行",
    //       "AgencyFee": 500,
    //       "IsHavePark": 1,
    //       "FillinBuyerGuid": "dr45fe4a-d402-451c-b9ed-8c1a04247482",
    //       "Progress": "1",
    //       "PaperState": "1",
    //       "PaperStateRemark": "测试",
    //       "IsEmergent": 0,
    //       "EmergentFee": 0,
    //       "UserGuid": "9245fe4a-d402-451c-b9ed-9c1bge247482"
    //     },
    //     {
    //       "Guid": "381cabf0-7ae6-11e8-8a49-b92cc9fd401b",
    //       "GroupGuid": "9245fe4a-d402-451c-b9ed-9c1a04247482",
    //       "Name": "太仓塞纳丽舍小区9幢502室买卖合同",
    //       "BuildingName": "9",
    //       "RoomName": "502",
    //       "Address": "太仓市郑和路157号",
    //       "LandArea": "10.00",
    //       "RoomArea": "109.52",
    //       "Price": "1500000.00",
    //       "IsLoan": 1,
    //       "LoanBank": "中国银行",
    //       "AgencyFee": 500,
    //       "IsHavePark": 1,
    //       "FillinBuyerGuid": "dr45fe4a-d402-451c-b9ed-8c1a04247482",
    //       "Progress": "1",
    //       "PaperState": "1",
    //       "PaperStateRemark": "测试",
    //       "IsEmergent": 0,
    //       "EmergentFee": 0,
    //       "UserGuid": "9245fe4a-d402-451c-b9ed-9c1bge247482"
    //     }
    //   ];
    //   this.isLoading = false;
    // });
    this.contractList = [
      {
        "Guid": "381cabf0-7ae6-11e8-8a49-b92cc9fd401b",
        "GroupGuid": "9245fe4a-d402-451c-b9ed-9c1a04247482",
        "Name": "太仓塞纳丽舍小区9幢502室买卖合同",
        "BuildingName": "9",
        "RoomName": "502",
        "Address": "太仓市郑和路157号",
        "LandArea": "10.00",
        "RoomArea": "109.52",
        "Price": "1500000.00",
        "IsLoan": 1,
        "LoanBank": "中国银行",
        "AgencyFee": 500,
        "IsHavePark": 1,
        "FillinBuyerGuid": "dr45fe4a-d402-451c-b9ed-8c1a04247482",
        "Progress": "1",
        "PaperState": "1",
        "PaperStateRemark": "测试",
        "IsEmergent": 0,
        "EmergentFee": 0,
        "UserGuid": "9245fe4a-d402-451c-b9ed-9c1bge247482"
      },
      {
        "Guid": "381cabf0-7ae6-11e8-8a49-b92cc9fd401b",
        "GroupGuid": "9245fe4a-d402-451c-b9ed-9c1a04247482",
        "Name": "太仓塞纳丽舍小区9幢502室买卖合同",
        "BuildingName": "9",
        "RoomName": "502",
        "Address": "太仓市郑和路157号",
        "LandArea": "10.00",
        "RoomArea": "109.52",
        "Price": "1500000.00",
        "IsLoan": 1,
        "LoanBank": "中国银行",
        "AgencyFee": 500,
        "IsHavePark": 1,
        "FillinBuyerGuid": "dr45fe4a-d402-451c-b9ed-8c1a04247482",
        "Progress": "1",
        "PaperState": "1",
        "PaperStateRemark": "测试",
        "IsEmergent": 0,
        "EmergentFee": 0,
        "UserGuid": "9245fe4a-d402-451c-b9ed-9c1bge247482"
      },
      {
        "Guid": "381cabf0-7ae6-11e8-8a49-b92cc9fd401b",
        "GroupGuid": "9245fe4a-d402-451c-b9ed-9c1a04247482",
        "Name": "太仓塞纳丽舍小区9幢502室买卖合同",
        "BuildingName": "9",
        "RoomName": "502",
        "Address": "太仓市郑和路157号",
        "LandArea": "10.00",
        "RoomArea": "109.52",
        "Price": "1500000.00",
        "IsLoan": 1,
        "LoanBank": "中国银行",
        "AgencyFee": 500,
        "IsHavePark": 1,
        "FillinBuyerGuid": "dr45fe4a-d402-451c-b9ed-8c1a04247482",
        "Progress": "1",
        "PaperState": "1",
        "PaperStateRemark": "测试",
        "IsEmergent": 0,
        "EmergentFee": 0,
        "UserGuid": "9245fe4a-d402-451c-b9ed-9c1bge247482"
      },
      {
        "Guid": "381cabf0-7ae6-11e8-8a49-b92cc9fd401b",
        "GroupGuid": "9245fe4a-d402-451c-b9ed-9c1a04247482",
        "Name": "太仓塞纳丽舍小区9幢502室买卖合同",
        "BuildingName": "9",
        "RoomName": "502",
        "Address": "太仓市郑和路157号",
        "LandArea": "10.00",
        "RoomArea": "109.52",
        "Price": "1500000.00",
        "IsLoan": 1,
        "LoanBank": "中国银行",
        "AgencyFee": 500,
        "IsHavePark": 1,
        "FillinBuyerGuid": "dr45fe4a-d402-451c-b9ed-8c1a04247482",
        "Progress": "1",
        "PaperState": "1",
        "PaperStateRemark": "测试",
        "IsEmergent": 0,
        "EmergentFee": 0,
        "UserGuid": "9245fe4a-d402-451c-b9ed-9c1bge247482"
      },
      {
        "Guid": "381cabf0-7ae6-11e8-8a49-b92cc9fd401b",
        "GroupGuid": "9245fe4a-d402-451c-b9ed-9c1a04247482",
        "Name": "太仓塞纳丽舍小区9幢502室买卖合同",
        "BuildingName": "9",
        "RoomName": "502",
        "Address": "太仓市郑和路157号",
        "LandArea": "10.00",
        "RoomArea": "109.52",
        "Price": "1500000.00",
        "IsLoan": 1,
        "LoanBank": "中国银行",
        "AgencyFee": 500,
        "IsHavePark": 1,
        "FillinBuyerGuid": "dr45fe4a-d402-451c-b9ed-8c1a04247482",
        "Progress": "1",
        "PaperState": "1",
        "PaperStateRemark": "测试",
        "IsEmergent": 0,
        "EmergentFee": 0,
        "UserGuid": "9245fe4a-d402-451c-b9ed-9c1bge247482"
      },
      {
        "Guid": "381cabf0-7ae6-11e8-8a49-b92cc9fd401b",
        "GroupGuid": "9245fe4a-d402-451c-b9ed-9c1a04247482",
        "Name": "太仓塞纳丽舍小区9幢502室买卖合同",
        "BuildingName": "9",
        "RoomName": "502",
        "Address": "太仓市郑和路157号",
        "LandArea": "10.00",
        "RoomArea": "109.52",
        "Price": "1500000.00",
        "IsLoan": 1,
        "LoanBank": "中国银行",
        "AgencyFee": 500,
        "IsHavePark": 1,
        "FillinBuyerGuid": "dr45fe4a-d402-451c-b9ed-8c1a04247482",
        "Progress": "1",
        "PaperState": "1",
        "PaperStateRemark": "测试",
        "IsEmergent": 0,
        "EmergentFee": 0,
        "UserGuid": "9245fe4a-d402-451c-b9ed-9c1bge247482"
      },
      {
        "Guid": "381cabf0-7ae6-11e8-8a49-b92cc9fd401b",
        "GroupGuid": "9245fe4a-d402-451c-b9ed-9c1a04247482",
        "Name": "太仓塞纳丽舍小区9幢502室买卖合同",
        "BuildingName": "9",
        "RoomName": "502",
        "Address": "太仓市郑和路157号",
        "LandArea": "10.00",
        "RoomArea": "109.52",
        "Price": "1500000.00",
        "IsLoan": 1,
        "LoanBank": "中国银行",
        "AgencyFee": 500,
        "IsHavePark": 1,
        "FillinBuyerGuid": "dr45fe4a-d402-451c-b9ed-8c1a04247482",
        "Progress": "1",
        "PaperState": "1",
        "PaperStateRemark": "测试",
        "IsEmergent": 0,
        "EmergentFee": 0,
        "UserGuid": "9245fe4a-d402-451c-b9ed-9c1bge247482"
      }
    ];
    this.isLoading = false;
  }

  /** 前的表格中的数据改变时
   *
   *
   * @param {Array<Object>} $event
   * @memberof ShowContactListComponent
   */
  currentPageDataChange($event: Array<Object>): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  /** 刷新表格数据
   *
   *
   * @memberof ShowContactListComponent
   */
  refreshStatus(): void {
    const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.contractListChange.emit([...this.displayData]);
  }

  /** 选中表格中的所有数据
   *
   *
   * @param {boolean} value
   * @memberof ShowContactListComponent
   */
  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  /** 选择一个合同数据
   *
   *
   * @param {Object} ContractItem
   * @memberof ShowContactListComponent
   */
  chooseTheContract(ContractItem: Object): void {
    this.choosedContract.emit(ContractItem);
  }

  /** 更改页数
   *
   *
   * @param {number} pageNo
   * @memberof ShowContactListComponent
   */
  changePageNo(pageNo: number): void {
    this.refreshCondition.params.pageNo = pageNo;
  }

}
