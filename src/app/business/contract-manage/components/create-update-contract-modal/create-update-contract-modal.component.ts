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
  // 楼盘数据
  _createItem: Object;

  @Input() set createItem(createItem: Object) {
    this._createItem = createItem;
    this.initForm(createItem);
  }

  @Output() createItemChange = new EventEmitter<Object>();
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

  /** 提交modal中的数据
   *
   *
   * @memberof CreateUpdateGroupModalComponent
   */
  submitTheModal(): void {
    this.checkForm();
    if (this.validateForm.valid) {
      // tode: 构造要新增或者更新的数据项
      const values = this.validateForm.value;
      this._createItem['Name'] = values['Name'];
      this._createItem['BuildingCount'] = values['BuildingCount'];
      this._createItem['RoomCount'] = values['RoomCount'];
      this._createItem['CourtName'] = values['CourtName'];
      this.createOrUpdateTheGroupItem(this._createItem);
    }
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

  /** 检查表单数据
   *
   *
   * @memberof CreateUpdateGroupModalComponent
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
   * @param {Object} groupItem
   * @memberof CreateUpdateGroupModalComponent
   */
  initForm(groupItem: Object): void {
    if (groupItem) {
      if (this.isCreate) {
        this.theModalTitle = '新增合同';
      } else {
        this.theModalTitle = groupItem['Name'];
      }
      this.validateForm = this.fb.group({
        Name: [groupItem['Name'], [Validators.required]],
        BuildingCount: [groupItem['BuildingCount'], [Validators.required]],
        RoomCount: [groupItem['RoomCount'], [Validators.required,]],
        CourtName: [groupItem['CourtName'], [Validators.required]],
      });
    }
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
        this.createItemChange.emit(this._createItem);
        this.closeTheModal();
      });
    } else {
      this.service.updateTheContract(groupItem, this.updateGroupUrl).subscribe(callback => {
        console.log(callback);
        this.createItemChange.emit(this._createItem);
        this.closeTheModal();
      });
    }
  }

}
