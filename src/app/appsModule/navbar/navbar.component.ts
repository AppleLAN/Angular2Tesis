import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../services/user-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{
  
  constructor(private authService: UserAuthenticationService, private router: Router) {}
  ngOnInit() {
     
  } 
  logOut() {
    this.authService.logout();
  }
  isActive(url) {
    return this.router.url === url;
  }
}