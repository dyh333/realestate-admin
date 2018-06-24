import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
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
export class LayoutRoutesModule { }
