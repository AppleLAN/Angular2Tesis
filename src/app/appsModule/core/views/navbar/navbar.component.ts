import { Component, OnInit, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { UserAuthenticationService } from '../../../../services/user-authentication.service';
import { UserService } from '../../../../services/user.service';
import { Router, Event, NavigationStart } from '@angular/router';

import { Observable } from 'rxjs/Rx';

declare var jQuery: any;
@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, AfterViewInit {

  @ViewChild('myModalNormal') myModalNormal: any;
  userApps: Observable<void>;
  parentUrl: string;
  windowWidth: number = window.innerWidth;

  constructor(
    private authService: UserAuthenticationService,
    private userService: UserService,
    private router: Router
  ) {
    this.getUrl(router);
  }

  private getUrl(fromHere: any) {
    this.parentUrl = fromHere.url;
    const params = this.parentUrl.split('/');
    this.parentUrl = params[2];
  }

  ngOnInit() {
    this.userService.getUserApps()
    .subscribe(
     response => {
      this.userApps = response.filter( (apps: any) => !!apps.active);
    },
     error => {
       console.log(error);
     }
   );
   this.router.events
    .subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.getUrl(event);
      }
    });
  }

  ngAfterViewInit() {
    this.windowWidth = window.innerWidth;
  }

  showProfileModal() {
    jQuery('.ui.modal.profile-modal').modal('show');
  }

  logOut() {
    this.authService.logout();
  }

  @HostListener('window:resize', ['$event'])
  resize(event: any) {
      this.windowWidth = window.innerWidth;
  }
}
