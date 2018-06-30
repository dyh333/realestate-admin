import { Routes, RouterModule } from '@angular/router';
import { ContractManageComponent } from './contract-manage.component';
import { NgModule } from '@angular/core';
import { ContractManageService } from './servicves';

const routes: Routes = [
  {
    path: '',
    component: ContractManageComponent,
    resolve: {
      config: ContractManageService,
    }
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractManageRoutesModule { }
