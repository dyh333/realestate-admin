import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'app-create-update-realestate-registration',
  templateUrl: './create-update-realestate-registration.component.html',
  styleUrls: ['./create-update-realestate-registration.component.scss']
})
export class CreateUpdateRealestateRegistrationComponent implements OnInit {
  
  fileList = [ 
    {
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
  ];

  previewImage = '';

  previewVisible = false;

  uploadImgUrl:string;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { config }) => {
      const config = data.config;
      // console.log(config);
      this.uploadImgUrl = config['uploadImgUrl'];
    });
  }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

}
