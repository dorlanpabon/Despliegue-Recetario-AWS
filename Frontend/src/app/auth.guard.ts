import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router:Router) { }
  
  canActivate(){
    if(this.authService.isLoggedIn()){
      return true;
    }else{
      this.authService.logout();
      this.router.navigate(['/login']);
      return false;
    }
  } 
}
