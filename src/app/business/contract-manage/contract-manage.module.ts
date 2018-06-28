import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractManageComponent } from './contract-manage.component';
import { FormsModule } from '@angular/forms';
import { ContractManageRoutesModule } from './contract-manage.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NgZorroAntdModule,
    ContractManageRoutesModule,
  ],
  declarations: [ContractManageComponent]
})
export class ContractManageModule { }
