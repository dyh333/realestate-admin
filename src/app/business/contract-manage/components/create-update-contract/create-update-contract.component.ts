import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-update-contract',
  templateUrl: './create-update-contract.component.html',
  styleUrls: ['./create-update-contract.component.scss']
})
export class CreateUpdateContractComponent implements OnInit {
  // 是否新增楼盘
  @Input() isCreate: boolean = true;

  @Output() isCreateChange = new EventEmitter<boolean>();
  // 合同数据
  _contractItem: Object;

  @Input() set contractItem(contractItem: Object) {
    this._contractItem = contractItem;
    this.initForm(contractItem);
  }
  // 检验表单
  validateForm: FormGroup;
  // 新增的api接口地址
  createGroupUrl: string;
  // 更新的api接口地址
  updateGroupUrl: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { config }) => {
      const config = data.config;
      this.createGroupUrl = config.createGroupUrl;
      this.updateGroupUrl = config.updateGroupUrl;
    });
  }

  checkForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  initForm(contractItem: Object): void {
    if (contractItem) {
      this.validateForm = this.fb.group({
        Name: [contractItem['Name'], [Validators.required]],
        BuildingName: [contractItem['BuildingName'], [Validators.required]],
        RoomName: [contractItem['RoomName'], [Validators.required]],
        Address: [contractItem['Address'], [Validators.required]],
        LandArea: [contractItem['LandArea'], [Validators.required]],
        RoomArea: [contractItem['RoomArea'], [Validators.required]],
        Price: [contractItem['Price'], [Validators.required]],
        IsLoan: [contractItem['IsLoan'] ? '1' : '0', [Validators.required]],
        LoanBank: [contractItem['LoanBank'], [Validators.required]],
        AgencyFee: [contractItem['AgencyFee'], [Validators.required]],
        IsHavePark: [contractItem['IsHavePark'] ? '1' : '0', [Validators.required]],
        Progress: [contractItem['Progress'] + '', [Validators.required]],
        PaperState: [contractItem['PaperState'] + '', [Validators.required]],
        PaperStateRemark: [contractItem['PaperStateRemark'], [Validators.required]],
        IsEmergent: [contractItem['IsEmergent'] ? '1' : '0', [Validators.required]],
        EmergentFee: [contractItem['EmergentFee'], [Validators.required]],
      });
    }
  }

  submitCreateOrUpdate(): void {

  }

  cancleCreateOrUpdate(): void {

  }

}
