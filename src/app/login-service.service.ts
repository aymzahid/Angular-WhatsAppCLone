import { FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  private _LoginUrl = 'http://192.168.138.99/ChatAppLaravel/public/login';
  private _getUsersUrl = 'http://192.168.138.99/ChatAppLaravel/public/getUsers';
  private _getReceiverName =
    'http://192.168.138.99/ChatAppLaravel/public/getReciverName';
  private _getMessagesUrl =
    'http://192.168.138.99/ChatAppLaravel/public/getMessages';
  token: any;
  private _SendMessageUrl =
    'http://192.168.138.99/ChatAppLaravel/public/sendMessage';
  constructor(private http: HttpClient) {}

  loginAuth(loginData: any) {
    // console.log('login service');
    return this.http.post<any>(this._LoginUrl, loginData);
  }

  getusers() {
    // const usersstring = JSON.stringify(users);
    // console.log('api returned' + users);
    // console.log('api returned' + usersstring);
    // console.log('from service', this.login.LogUserToken);
    // this.token = Token;
    this.token = localStorage.getItem('LogUserToken');
    const formdata = new FormData();
    formdata.append('token', this.token);
    return this.http.post<any>(this._getUsersUrl, formdata);
  }
  getRecieverName(id: any) {
    const formdata = new FormData();
    formdata.append('id', id);
    return this.http.post<any>(this._getReceiverName, formdata);
  }
  getMessage(receiver_id: any, sender_id: any) {
    const formdata = new FormData();
    formdata.append('receiver_id', receiver_id);
    formdata.append('sender_id', sender_id);
    return this.http.post<any>(this._getMessagesUrl, formdata);
  }
  SendMessage(Send_message: any, receiver_id: any, sender_id: any) {
    const formdata = new FormData();
    formdata.append('message', Send_message);
    formdata.append('receiver_id', receiver_id);
    formdata.append('sender_id', sender_id);
    console.log(formdata);
    return this.http.post<any>(this._SendMessageUrl, formdata);
  }
}
