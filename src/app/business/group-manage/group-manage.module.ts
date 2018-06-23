import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupManageComponent } from './group-manage.component';
import { GroupManageRoutesModule } from './group-manage.routing';
import {
  NzTableModule,
  NzButtonModule,
  NzModalModule,
  NzFormModule,
  NzToolTipModule,
  NzInputModule,
  NzGridModule,
  NzInputNumberModule
} from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzTableModule,
    NzModalModule,
    NzFormModule,
    NzToolTipModule,
    NzInputModule,
    NzGridModule,
    NzInputNumberModule,
    GroupManageRoutesModule,
  ],
  declarations: [GroupManageComponent]
})
export class GroupManageModule { }
