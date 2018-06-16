import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealestateAdminComponent } from './realestate-admin.component';
import { RealestateAdminRoutesModule } from './realestate-admin.routing';
import {
  NzMenuModule,
  NzDropDownModule
} from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    NzMenuModule,
    NzDropDownModule,
    RealestateAdminRoutesModule
  ],
  declarations: [RealestateAdminComponent]
})
export class RealestateAdminModule { }
