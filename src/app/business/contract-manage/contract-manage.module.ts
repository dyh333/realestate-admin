import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractManageComponent } from './contract-manage.component';
import { FormsModule } from '@angular/forms';
import { ContractManageRoutesModule } from './contract-manage.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SharedModule } from '../../shared/shared.module';
import {
  ShowContactListComponent,
  CreateUpdateContractModalComponent,
  DeleteContractModalComponent
} from './components';
import { ContractManageService } from './servicves';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NgZorroAntdModule,
    ContractManageRoutesModule,
  ],
  declarations: [
    ContractManageComponent,
    ShowContactListComponent,
    CreateUpdateContractModalComponent,
    DeleteContractModalComponent,
  ],
  providers: [ContractManageService]
})
export class ContractManageModule { }
