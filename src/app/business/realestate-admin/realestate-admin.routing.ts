import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RealestateAdminComponent } from './realestate-admin.component';

const routes: Routes = [
  {
    path: '',
    component: RealestateAdminComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RealestateAdminRoutesModule { }
