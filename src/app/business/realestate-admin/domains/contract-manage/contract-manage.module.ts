import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractManageComponent } from './contract-manage.component';
import { ContractManageRoutesModule } from './contract-manage.routing';

@NgModule({
  imports: [
    CommonModule,
    ContractManageRoutesModule,
  ],
  declarations: [ContractManageComponent]
})
export class ContractManageModule { }
