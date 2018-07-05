import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractManageComponent } from './contract-manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContractManageRoutesModule } from './contract-manage.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SharedModule } from '../../shared/shared.module';
import {
  ShowContactListComponent,
  CreateUpdateContractModalComponent,
  CreateUpdateContractComponent,
  DeleteContractModalComponent,
  CreateUpdateBuyersInfoComponent,
  CreateUpdateRealestateRegistrationComponent
} from './components';
import { ContractManageService } from './servicves';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgZorroAntdModule,
    PerfectScrollbarModule,
    ContractManageRoutesModule,
  ],
  declarations: [
    ContractManageComponent,
    ShowContactListComponent,
    CreateUpdateContractModalComponent,
    CreateUpdateContractComponent,
    DeleteContractModalComponent,
    CreateUpdateBuyersInfoComponent,
    CreateUpdateRealestateRegistrationComponent,
  ],
  providers: [ContractManageService]
})
export class ContractManageModule { }
