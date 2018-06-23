import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RealestateAdminComponent } from './realestate-admin.component';

const routes: Routes = [
  {
    path: '',
    component: RealestateAdminComponent,
    children: [
      {
        path: 'groupManage',
        loadChildren: './../group-manage/group-manage.module#GroupManageModule'
      },
      {
        path: 'contractManage',
        loadChildren: './../contract-manage/contract-manage.module#ContractManageModule'
      },
      { path: '', redirectTo: 'groupManage', pathMatch: 'full' }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealestateAdminRoutesModule { }
