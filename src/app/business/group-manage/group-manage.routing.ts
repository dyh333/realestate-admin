import { Routes, RouterModule } from '@angular/router';
import { GroupManageComponent } from './group-manage.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: GroupManageComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupManageRoutesModule { }
