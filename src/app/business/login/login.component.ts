import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  account: AbstractControl;
  password: AbstractControl;
  isSubmitting: boolean = false;
  loginErrorInfo: string;

  copyRights: string[] = ['技术支持：'];

  loginApi: Object = {};

  constructor(
    fb: FormBuilder,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {
    this.form = fb.group({
      account: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)])
      ]
    });

    this.account = this.form.controls['account'];
    this.password = this.form.controls['password'];

    if (localStorage.getItem('account')) {
      this.account.setValue(localStorage.getItem('account'));
    }
  }

  ngOnInit() {

  }

  public onSubmit(): void {
    if (this.form.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.loginService.verifyLogin(this.account.value, this.password.value, this.loginApi)
        .subscribe({
          next: errorInfo => {
            this.loginErrorInfo = errorInfo;
            this.isSubmitting = false;
          }
        });

    }
  }
}
