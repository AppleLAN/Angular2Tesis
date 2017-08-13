import { Router } from '@angular/router';
import { Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { Client } from '../../../../interfaces/client';
import { UserAuthenticationService } from '../../../../services/user-authentication.service';
declare var jQuery:any;
@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  @ViewChild('myModalNormal') myModalNormal:any;

  constructor(
    private authService: UserAuthenticationService
  ) {}

  ngOnInit() {
  } 
  
  showProfileModal(){ 
    jQuery('.ui.modal.profile-modal').modal('show');
  }

  logOut() {
    this.authService.logout();
  }
}