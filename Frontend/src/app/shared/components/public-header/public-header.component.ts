import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-public-header',
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.css']
})
export class PublicHeaderComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }
  auth = this.authService;

  ngOnInit(): void {
  }

}
