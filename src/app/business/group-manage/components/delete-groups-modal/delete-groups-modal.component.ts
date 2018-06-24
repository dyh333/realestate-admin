import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-delete-groups-modal',
  templateUrl: './delete-groups-modal.component.html',
  styleUrls: ['./delete-groups-modal.component.scss']
})
export class DeleteGroupsModalComponent implements OnInit {
  // 删除功能的modal是否可用
  @Input() isDelModalVisible: boolean = false;

  @Output() isDelModalVisibleChange = new EventEmitter<boolean>();
  // 要删除的数据列表
  @Input() toDelDataList = [];
  // 是否删除
  @Output() isToDelete = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  /** 确认删除功能的modal中的内容
   *
   *
   * @memberof DeleteGroupsModalComponent
   */
  confirmTheDelModal(): void {
    if (this.toDelDataList.length > 0) {
      // todo:删除选中的数据
      this.isToDelete.emit(true);
    }
    this.closeTheDelModal();
  }

  /** 关闭删除功能的modal
   *
   *
   * @memberof DeleteGroupsModalComponent
   */
  closeTheDelModal(): void {
    this.isDelModalVisible = false;
    this.isDelModalVisibleChange.emit(false);
  }

}
