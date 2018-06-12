import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-realestate-admin',
  templateUrl: './realestate-admin.component.html',
  styleUrls: ['./realestate-admin.component.scss']
})
export class RealestateAdminComponent implements OnInit {
  // 左侧菜单是否折叠
  isCollapsed: boolean = false;

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }

  /** 点击菜单项
   *
   *
   * @param {string} menuUrl 菜单对应的路径
   * @memberof RealestateAdminComponent
   */
  clickMenuItem(menuUrl: string): void {
    this.router.navigate([menuUrl]);
  }

}
