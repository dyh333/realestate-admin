import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  // 左侧菜单是否折叠
  isCollapsed: boolean = true;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  /** 点击菜单项
   *
   *
   * @param {string} menuUrl 菜单对应的路径
   * @memberof LayoutComponent
   */
  clickMenuItem(menuUrl: string): void {
    this.router.navigate([menuUrl]);
  }
}
