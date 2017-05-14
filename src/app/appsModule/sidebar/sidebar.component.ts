import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../services/user-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-component',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit{
  
  constructor(private authService: UserAuthenticationService, private router: Router) {}
  ngOnInit() {
     
  } 
 
  isActive(url) {
    return this.router.url === url;
  }
}