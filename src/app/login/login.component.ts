import { Routes } from '@angular/router';
import { LoginServiceService } from './../login-service.service';
import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  LoginForm: any;
  LogUserToken: any;
  LoginUser: any = [];

  constructor(
    private fb: FormBuilder,
    private LoginService: LoginServiceService,
    private http: HttpClient,
    private router: Router
  ) {
    this.LoginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  ngOnInit(): void {}

  Login() {
    const loginData = new FormData();
    loginData.append('email', this.LoginForm.get('email').value);
    loginData.append('password', this.LoginForm.get('password').value);
    // console.log(loginData.get('email'), loginData.get('password'));
    this.LoginService.loginAuth(loginData).subscribe((res) => {
      // const loginResponse = JSON.stringify(res.users);
      // localStorage.setItem('user', JSON.stringify(loginResponse));

      this.LogUserToken = res.users['token'];
      console.log('Response Status ', res.status);
      // console.log('logged in Token ', this.LogUserToken);
      localStorage.setItem('LogUserToken', this.LogUserToken);

      if (res.status == true) {
        this.LoginUser = res.users;
        localStorage.setItem('LoginUser', JSON.stringify(res['users']));
        localStorage.setItem('LoginUserId', this.LoginUser.id);
        localStorage.setItem('LoginUserName', this.LoginUser.name);
        localStorage.setItem('LoginUserImage', this.LoginUser.image);

        console.log('login user', res.users);
        //saving logged in user to local storage
      }

      // gettin response status

      if (res.status == true) {
        //if response status is true call login function and route
        this.loggedIn();
      }
    });
  }
  loggedIn() {
    this.router
      .navigate(['/chat'])
      .then(() => {
        console.log('Logged In Successfully');
      })
      .catch((reason) => {
        console.log('Login Failed ' + reason);
      });
  }
}
