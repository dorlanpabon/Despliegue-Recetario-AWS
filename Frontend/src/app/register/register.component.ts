import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  error = { error: false, message: '' };
  user = { name: '', email: '', password: '' };
  confirmPassword = '';
  terms = false;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  register() {

    //Validate data before sending to server
    if (this.user.name == '' && this.user.email == '' && this.user.password == '' && this.confirmPassword == '' && this.terms == false) {
      this.error.error = true;
      this.error.message = 'Todos lo campos son requeridos';
      return;
    }

    if (this.user.password != this.confirmPassword) {
      this.error.error = true;
      this.error.message = "Contraseñas no coinciden";
      return;
    }

    this.authService.register(this.user).subscribe
      (
        res => {
          localStorage.setItem('token', res.params.token);
          this.router.navigate(['/dashboard']);
        }
      )
  }

}
