import { Component, enableProdMode } from '@angular/core';

// 增加该配置，避免数据检查更新时，造成前后不一致，系统报错
enableProdMode();
@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  title = 'app';
}
