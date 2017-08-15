import { Router } from '@angular/router';
import { Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { Client } from '../../../../interfaces/client';
import { User } from '../../../../interfaces/user';
import { UserAuthenticationService } from '../../../../services/user-authentication.service';
import { UserService } from '../../../../services/user.service';

import { Observable, Subscription } from 'rxjs/Rx';

declare var jQuery: any;
@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  @ViewChild('myModalNormal') myModalNormal: any;
  userApps: Observable<void>;
  commingSoonText = 'Pronto !';

  constructor(
    private authService: UserAuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.getUserApps()
    .subscribe(
     response => {
      this.userApps = response.filter( apps => !!apps.active);
    },
     error => {
       console.log(error);
     }
   );
  }

  showProfileModal() {
    jQuery('.ui.modal.profile-modal').modal('show');
  }

  logOut() {
    this.authService.logout();
  }
}
