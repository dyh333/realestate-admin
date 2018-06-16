import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RealestateAdminComponent } from './realestate-admin.component';

const routes: Routes = [
  {
    path: '',
    component: RealestateAdminComponent,
    children: [
      {
        path: 'contractManage',
        loadChildren: './domains/contract-manage/contract-manage.module#ContractManageModule'
      },
      { path: '', redirectTo: 'contractManage', pathMatch: 'full' }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealestateAdminRoutesModule { }
