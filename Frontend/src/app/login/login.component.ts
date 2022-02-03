import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error={error:false,message:''};
  user = {email: '', password: ''};

  constructor(
    private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
  }
  login(){
    this.authService.login(this.user).subscribe
    (
      res => {
        localStorage.setItem('token', res.params.token);
        this.router.navigate(['/dashboard']);
      },
      err => {
        this.error.error=err.error.error;
        this.error.message=err.error.message;
      }
    );

  }

}
