import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {
  HeaderComponent,
  ModuleHeaderComponent
} from './components';

const COMPONENTS = [
  HeaderComponent,
  ModuleHeaderComponent,
];

@NgModule({
  imports: [
    CommonModule,
    NgZorroAntdModule,
  ],
  declarations: [...COMPONENTS],
  exports: [
    ...COMPONENTS
  ]
})
export class SharedModule { }
