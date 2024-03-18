import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  url: string = 'http://localhost:3000'


  constructor(private http: HttpClient) { }

  genericPost(endPoint: string, payload: any) {
    return this.http.post(`${this.url}${endPoint}`, payload)
  }
}
