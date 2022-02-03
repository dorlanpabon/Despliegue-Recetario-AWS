import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenBearerService implements HttpInterceptor {
  
  constructor( private authService:AuthService ) { }

  intercept(req:any, next:any) {
    let token = localStorage.getItem('token');
    if(token){
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      });
    }
    return next.handle(req);
  }

}
