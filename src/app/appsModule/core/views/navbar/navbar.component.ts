import { AfterViewInit, Component, HostListener, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UserAuthenticationService } from '../../../../services/user-authentication.service';
import { UserService } from '../../../../services/user.service';


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

  logOut() {
    this.authService.logout();
  }

  @HostListener('window:resize', ['$event'])
  resize(event: any) {
      this.windowWidth = window.innerWidth;
  }
}
