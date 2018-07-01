import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutesModule } from './layout.routing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
    SharedModule,
    LayoutRoutesModule
  ],
  declarations: [LayoutComponent]
})
export class LayoutModule { }
