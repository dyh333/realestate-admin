import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroupManageComponent } from './group-manage.component';
import { GroupManageRoutesModule } from './group-manage.routing';
import {
  NzTableModule,
  NzButtonModule
} from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzTableModule,
    GroupManageRoutesModule,
  ],
  declarations: [GroupManageComponent]
})
export class GroupManageModule { }
