import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LoginServiceService } from './../login-service.service';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  userArray: any = [];
  name: any;
  imageUrl: any =
    'http://192.168.138.99/ChatAppLaravel/storage/app/public/images/';
  loggedUserName: any;
  LoggedUserImage: any;
  LoggedUserId: any;
  listValue: any;
  ReceiverData: any = [];
  receiver_id: any;
  sender_id: any;
  Send_message: any;

  constructor(
    private loginService: LoginServiceService,
    private router: Router
  ) {
    this.getusers();
    this.openChat(1);
  }

  ngOnInit(): void {}

  getusers() {
    // console.log('get user');
    this.loggedUserName = localStorage.getItem('LoginUserName');
    this.LoggedUserImage = localStorage.getItem('LoginUserImage');
    this.LoggedUserId = localStorage.getItem('LoginUserId');
    console.log(' Log user ka name', this.loggedUserName);
    console.log(' Log user ka image', this.LoggedUserImage);

    this.loginService.getusers().subscribe((res) => {
      if (res.status == true) {
        this.userArray = res.users;
        // console.log('All users array', this.userArray); all users array
      }
    });
  }

  openChat(id: any) {
    this.receiver_id = id;
    // console.log(id);

    this.loginService.getRecieverName(this.receiver_id).subscribe((res) => {
      this.ReceiverData = res.data;

      console.log(res.data);
    });
    this.getMessage(this.receiver_id);
  }
  getMessage(receiver_id: any) {
    this.receiver_id = receiver_id;
    this.sender_id = Number(localStorage.getItem('LoginUserId'));

    console.log(receiver_id, this.sender_id);
    this.loginService
      .getMessage(this.receiver_id, this.sender_id)
      .subscribe((res) => {
        this.ReceiverData = res.data;

        console.log('messages', this.ReceiverData);
      });
  }
  SendMessage() {
    console.log('message', this.Send_message, this.receiver_id, this.sender_id);
    this.loginService
      .SendMessage(this.Send_message, this.receiver_id, this.sender_id)
      .subscribe((res) => {
        console.log(res);
        this.getMessage(this.receiver_id);
      });
  }

  logout() {
    localStorage.clear();
    this.router
      .navigate(['/login'])
      .then(() => {
        console.log('Logged Out Successfully');
      })
      .catch((reason) => {
        console.log('Log Out ' + reason);
      });
  }
}
