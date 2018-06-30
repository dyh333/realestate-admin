import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupManageService } from '../../services';

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
  @Input() toDelDataList: Object[] = [];
  // 是否删除
  @Output() isToDelete = new EventEmitter<boolean>();
  // 删除的api接口地址
  deleteGroupUrl: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: GroupManageService,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { config }) => {
      const config = data.config;
      this.deleteGroupUrl = config.deleteGroupUrl;
    });
  }

  /** 确认删除功能的modal中的内容
   *
   *
   * @memberof DeleteGroupsModalComponent
   */
  confirmTheDelModal(): void {
    if (this.toDelDataList.length > 0) {
      // todo:删除选中的数据
      this.deleteGroups();
    } else {
      this.closeTheDelModal();
    }
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

  /** 删除楼盘数据
   *
   *
   * @memberof DeleteGroupsModalComponent
   */
  deleteGroups(): void {
    this.service.deleteGroups(this.toDelDataList, this.deleteGroupUrl).subscribe(callback => {
      console.log(callback);
      this.isToDelete.emit(true);
      this.closeTheDelModal();
    });
  }


}
