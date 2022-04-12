import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegFormServiceService {
  private _registerUrl = 'http://192.168.138.99/ChatAppLaravel/public/register';
  constructor(private http: HttpClient) {}

  saveformData(data: any) {
    console.log('service ', data);
    return this.http.post<any>(this._registerUrl, data);
  }
}
