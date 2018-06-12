import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RoutesModule } from './routes/routes.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    NgZorroAntdModule,
    RoutesModule
  ],
  declarations: [AppComponent],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN }
    // StartupService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: StartupServiceFactory,
    //   deps: [StartupService],
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
