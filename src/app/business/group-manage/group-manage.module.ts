import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupManageComponent } from './group-manage.component';
import { GroupManageRoutesModule } from './group-manage.routing';
import {
  ShowGroupListComponent,
  CreateUpdateGroupModalComponent,
  DeleteGroupsModalComponent
} from './components';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    GroupManageRoutesModule,
  ],
  declarations: [
    GroupManageComponent,
    ShowGroupListComponent,
    CreateUpdateGroupModalComponent,
    DeleteGroupsModalComponent,
  ],
  entryComponents: []
})
export class GroupManageModule { }
