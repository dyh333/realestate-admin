import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealestateAdminComponent } from './realestate-admin.component';
import { RealestateAdminRoutesModule } from './realestate-admin.routing';

@NgModule({
  imports: [
    CommonModule,
    RealestateAdminRoutesModule
  ],
  declarations: [RealestateAdminComponent]
})
export class RealestateAdminModule { }
