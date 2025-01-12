import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http=inject(HttpClient);
  private baseUrl ="http://localhost:3000/auth/";

  login(user:User):Observable<any>{
    return this.http.post<any>(this.baseUrl+"login",{ userName: user.userName, password: user.password }); 
  }
}
