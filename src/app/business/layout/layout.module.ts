import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutesModule } from './layout.routing';
import {
  NzMenuModule,
  NzDropDownModule
} from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    NzMenuModule,
    NzDropDownModule,
    LayoutRoutesModule
  ],
  declarations: [LayoutComponent]
})
export class LayoutModule { }
