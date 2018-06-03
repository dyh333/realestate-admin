import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
    //   {
    //     path: '',
    //     redirectTo: 'infinitescroll',
    //     pathMatch: 'full'
    //   },
    //   {
    //     path: 'pagejumppanel',
    //     component: PageJumpPanelDemoComponent
    //   },
    //   {
    //     path: 'infinitescroll',
    //     component: InfiniteScrollListComponent
    //   }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
