import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  genericGet(endpoint: string){
    return this.http.get(this.baseUrl+endpoint)
  }

  genericDelete(endpoint: string){
    return this.http.delete(this.baseUrl+endpoint)
  }
  updateBalance(userId: string, updatedUserData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}${userId}`, updatedUserData);
  }

  sendOtp(phoneNumber: string) {
    return this.http.post<any>(this.baseUrl, { phoneNumber });
  }
  

}
