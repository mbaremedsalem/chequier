import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environement/environement';
import { Message } from '../models/message.model';
const API_AUTH_URL = environment.baseUrlAuth + '/login';
const apiUrl = `${environment.mybaseurl}login/`;
const updatePasse = `${environment.mybaseurl}password/`;
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  
  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('currentUser')!));
    this.currentUser = this.currentUserSubject.asObservable();
  }


  login(credentials: any): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    return this.http.post<User>(apiUrl, credentials, httpOptions);
    
  }

  changePassword(credentials: any): Observable<Message> {
   
    // const headers = new HttpHeaders().set('Authorization', 'JWT '+localStorage.getItem('access'));
    return this.http.put<Message>(updatePasse, credentials);
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('expire_at');
    this.currentUserSubject.next(null);

  }

}
