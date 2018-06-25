import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
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
      this.groupItemChange.emit(this._groupItem);
      this.closeTheModal();
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

}
