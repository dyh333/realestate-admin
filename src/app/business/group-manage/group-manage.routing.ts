import { Routes, RouterModule } from '@angular/router';
import { GroupManageComponent } from './group-manage.component';
import { NgModule } from '@angular/core';
import { GroupManageService } from './services';

const routes: Routes = [
  {
    path: '',
    component: GroupManageComponent,
    resolve: {
      config: GroupManageService,
    }
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupManageRoutesModule { }
