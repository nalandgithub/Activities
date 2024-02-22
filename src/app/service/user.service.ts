import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://techwise-apps.com/activities/office/api/login';


  constructor(private http: HttpClient) { }


  loginUser(teamId: string, activityId: string): Observable<any> {
    debugger;
   // const url = `${this.apiUrl}/login`;
    return this.http.post(this.apiUrl, {teamId,activityId});
  }

  getQuestion(data:any): Observable<any> {
    return this.http.post(this.apiUrl +'/getquestion', data);
  }

  getAnswer(data:any): Observable<any> {
    return this.http.post(this.apiUrl +'/submitanswer', data);
  } 

  next(data:any): Observable<any> {
    return this.http.post(this.apiUrl +'/next', data);
  }
}
