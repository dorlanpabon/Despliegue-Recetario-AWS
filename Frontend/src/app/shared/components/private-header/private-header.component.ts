import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-private-header',
  templateUrl: './private-header.component.html',
  styleUrls: ['./private-header.component.css']
})
export class PrivateHeaderComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }
auth = this.authService;
  ngOnInit(): void {
  }

}
