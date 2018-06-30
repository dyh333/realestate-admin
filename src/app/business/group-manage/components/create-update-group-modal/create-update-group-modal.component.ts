import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GroupManageService } from '../../services';

@Component({
  selector: 'app-create-update-group-modal',
  templateUrl: './create-update-group-modal.component.html',
  styleUrls: ['./create-update-group-modal.component.scss']
})
export class CreateUpdateGroupModalComponent implements OnInit {
  // 新增或者编辑的modal是否可用
  @Input() isCreateOrUpdataModalVisible: boolean = false;

  @Output() isCreateOrUpdataModalVisibleChange = new EventEmitter<boolean>();
  // 是否新增楼盘
  @Input() isCreate: boolean = true;

  @Output() isCreateChange = new EventEmitter<boolean>();
  // 楼盘数据
  _groupItem: Object;

  @Input() set groupItem(groupItem: Object) {
    this._groupItem = groupItem;
    this.initForm(groupItem);
  }

  @Output() groupItemChange = new EventEmitter<Object>();
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
    private service: GroupManageService,
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
      this._groupItem['Name'] = values['Name'];
      this._groupItem['BuildingCount'] = values['BuildingCount'];
      this._groupItem['RoomCount'] = values['RoomCount'];
      this._groupItem['CourtName'] = values['CourtName'];
      this.createOrUpdateTheGroupItem(this._groupItem);
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
        this.theModalTitle = '新增楼盘';
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
      this.service.createAGroup(groupItem, this.createGroupUrl).subscribe(callback => {
        console.log(callback);
        this.groupItemChange.emit(this._groupItem);
        this.closeTheModal();
      });
    } else {
      this.service.updateTheGroup(groupItem, this.updateGroupUrl).subscribe(callback => {
        console.log(callback);
        this.groupItemChange.emit(this._groupItem);
        this.closeTheModal();
      });
    }
  }

}
