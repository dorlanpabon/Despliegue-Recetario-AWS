import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private router:Router) { }

  login(user: any){
    return this.http.post<any>(environment.apiURL + '/user/login', user);
  }

  register(user: any){
    return this.http.post<any>(environment.apiURL + '/user/register', user);
  }

  getUser(){
    return this.http.get<any>(environment.apiURL + '/user/me');
  }

  isLoggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }




}
