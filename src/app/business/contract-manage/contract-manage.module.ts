import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractManageComponent } from './contract-manage.component';
import { FormsModule } from '@angular/forms';
import { ContractManageRoutesModule } from './contract-manage.routing';
import {
  NzTreeModule,
  NzButtonModule,
  NzTableModule
} from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzTreeModule,
    NzButtonModule,
    NzTableModule,
    ContractManageRoutesModule,
  ],
  declarations: [ContractManageComponent]
})
export class ContractManageModule { }
