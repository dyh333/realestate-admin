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
  selector: 'app-delete-contract-modal',
  templateUrl: './delete-contract-modal.component.html',
  styleUrls: ['./delete-contract-modal.component.scss']
})
export class DeleteContractModalComponent implements OnInit {
  // 删除功能的modal是否可用
  @Input() isDelModalVisible: boolean = false;

  @Output() isDelModalVisibleChange = new EventEmitter<boolean>();
  // 要删除的数据列表
  @Input() toDelDataList: Object[] = [];
  // 是否删除
  @Output() isToDelete = new EventEmitter<boolean>();
  // 删除的api接口地址
  deleteContractsUrl: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ContractManageService,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { config }) => {
      const config = data.config;
      this.deleteContractsUrl = config.deleteContractsUrl;
    });
  }

  /** 确认删除功能的modal中的内容
   *
   *
   * @memberof DeleteContractModalComponent
   */
  confirmTheDelModal(): void {
    if (this.toDelDataList.length > 0) {
      // todo:删除选中的数据
      this.deleteContracts();
    } else {
      this.closeTheDelModal();
    }
  }

  /** 关闭删除功能的modal
   *
   *
   * @memberof DeleteContractModalComponent
   */
  closeTheDelModal(): void {
    this.isDelModalVisible = false;
    this.isDelModalVisibleChange.emit(false);
  }

  /** 删除合同数据
   *
   *
   * @private
   * @memberof DeleteContractModalComponent
   */
  private deleteContracts(): void {
    // this.service.deleteContracts(this.toDelDataList, this.deleteContractsUrl).subscribe(callback => {
    //   console.log(callback);
    //   this.isToDelete.emit(true);
    //   this.closeTheDelModal();
    // });
    
      this.isToDelete.emit(true);
      this.closeTheDelModal();
  }

}
