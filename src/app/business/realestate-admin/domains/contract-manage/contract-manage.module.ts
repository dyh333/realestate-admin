import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTreeModule } from 'ng-zorro-antd';
import { ContractManageComponent } from './contract-manage.component';
import { ContractManageRoutesModule } from './contract-manage.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzTreeModule,
    ContractManageRoutesModule,
  ],
  declarations: [ContractManageComponent]
})
export class ContractManageModule { }
