import { Routes, RouterModule } from '@angular/router';
import { ContractManageComponent } from './contract-manage.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ContractManageComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractManageRoutesModule { }
