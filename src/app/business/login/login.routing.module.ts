import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
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
export class LoginRoutingModule {}
