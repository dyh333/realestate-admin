import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { RoutesModule } from './routes/routes.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgZorroAntdModule.forRoot(), RoutesModule],
  bootstrap: [AppComponent],
  providers: [
    // StartupService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: StartupServiceFactory,
    //   deps: [StartupService],
    //   multi: true
    // }
  ]
})
export class AppModule {}
