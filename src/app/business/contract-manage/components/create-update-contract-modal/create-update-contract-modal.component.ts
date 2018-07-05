import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContractManageService } from '../../servicves';

@Component({
  selector: 'app-create-update-contract-modal',
  templateUrl: './create-update-contract-modal.component.html',
  styleUrls: ['./create-update-contract-modal.component.scss']
})
export class CreateUpdateContractModalComponent implements OnInit {
  // 新增或者编辑的modal是否可用
  @Input() isCreateOrUpdataModalVisible: boolean = false;

  @Output() isCreateOrUpdataModalVisibleChange = new EventEmitter<boolean>();
  // 是否新增楼盘
  @Input() isCreate: boolean = true;

  @Output() isCreateChange = new EventEmitter<boolean>();

  _contractItem: Object;

  @Input() set contractItem(contractItem: Object) {
    this._contractItem = contractItem;
    if (contractItem) {
      this.theModalTitle = '买卖合同';
    }
  }

  get contractItem(): Object {
    return this._contractItem;
  }

  @Output() contractItemChange = new EventEmitter<Object>();
  // 新增或者编辑的modal的标题
  theModalTitle: string;
  // 检验表单
  validateForm: FormGroup;
  // 新增的api接口地址
  createGroupUrl: string;
  // 更新的api接口地址
  updateGroupUrl: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private service: ContractManageService,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { config }) => {
      const config = data.config;
      this.createGroupUrl = config.createGroupUrl;
      this.updateGroupUrl = config.updateGroupUrl;
    });
  }

  /** 关闭modal
   *
   *
   * @memberof CreateUpdateGroupModalComponent
   */
  closeTheModal(): void {
    this.isCreateOrUpdataModalVisible = false;
    this.isCreateOrUpdataModalVisibleChange.emit(false);
  }

  /** 新增或者编辑楼盘
   *
   *
   * @param {Object} groupItem
   * @memberof CreateUpdateGroupModalComponent
   */
  createOrUpdateTheGroupItem(groupItem: Object): void {
    // todo: 根据情况，新增或者编辑楼盘数据
    if (this.isCreate) {
      this.service.createAContract(groupItem, this.createGroupUrl).subscribe(callback => {
        console.log(callback);
        // this.createItemChange.emit(this._createItem);
        this.closeTheModal();
      });
    } else {
      this.service.updateTheContract(groupItem, this.updateGroupUrl).subscribe(callback => {
        console.log(callback);
        // this.createItemChange.emit(this._createItem);
        this.closeTheModal();
      });
    }
  }

}
