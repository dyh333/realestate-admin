import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-add-update-group-modal',
  templateUrl: './add-update-group-modal.component.html',
  styleUrls: ['./add-update-group-modal.component.scss']
})
export class AddUpdateGroupModalComponent implements OnInit {
  // 新增或者编辑的modal是否可用
  @Input() isAddOrUpdataModalVisible: boolean = false;

  @Output() isAddOrUpdataModalVisibleChange = new EventEmitter<boolean>();
  // 是否新增楼盘
  @Input() isAdd: boolean = true;

  @Output() isAddChange = new EventEmitter<boolean>();

  @Input() set groupItem(groupItem: Object) {
    this.initForm(groupItem);
  }

  @Output() groupItemChange = new EventEmitter<boolean>();
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
   * @memberof AddUpdateGroupModalComponent
   */
  submitTheModal(): void {
    // tode: 构造要新增或者更新的数据项
    // dataItem
    this.closeTheModal();
  }

  /** 关闭modal
   *
   *
   * @memberof AddUpdateGroupModalComponent
   */
  closeTheModal(): void {
    this.isAddOrUpdataModalVisible = false;
    this.isAddOrUpdataModalVisibleChange.emit(false);
  }

  /** 检查表单数据
   *
   *
   * @memberof AddUpdateGroupModalComponent
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
   * @memberof AddUpdateGroupModalComponent
   */
  initForm(groupItem: Object): void {
    if (groupItem) {
      if (this.isAdd) {
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
