import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: './../business/login/login.module#LoginModule'
  },
  {
    path: 'realestateAdmin',
    loadChildren: './../business/layout/layout.module#LayoutModule'
  },
  { path: '', redirectTo: 'realestateAdmin', pathMatch: 'full' },
];
