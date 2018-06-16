import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: './../business/login/login.module#LoginModule'
  },
  {
    path: 'realestateAdmin',
    loadChildren: './../business/realestate-admin/realestate-admin.module#RealestateAdminModule'
  }
];
