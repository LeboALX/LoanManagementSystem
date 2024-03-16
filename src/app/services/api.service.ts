import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = environment.nodeAppUrl;

  constructor(private http: HttpClient) { }

  genericPost(endpoint:string, payload:any) {
    return this.http.post(this.baseUrl+endpoint, payload)
  }

}
