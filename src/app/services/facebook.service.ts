import { Injectable } from '@angular/core';

declare const FB: any;

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  constructor() { }

  login(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      FB.login((response: { authResponse: any; }) => {
        if (response.authResponse) {
          resolve(response.authResponse);
        } else {
          reject('User cancelled login or did not fully authorize.');
        }
      });
    });
  }
  logout(): void {
    FB.logout();
  }
}
