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
import { GroupManageService } from './services';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgZorroAntdModule,
    GroupManageRoutesModule,
  ],
  declarations: [
    GroupManageComponent,
    ShowGroupListComponent,
    CreateUpdateGroupModalComponent,
    DeleteGroupsModalComponent,
  ],
  providers: [
    GroupManageService,
  ],
  entryComponents: []
})
export class GroupManageModule { }
