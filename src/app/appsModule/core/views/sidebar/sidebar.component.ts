import { Component } from '@angular/core';
import { UserAuthenticationService } from '../../../../services/user-authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar-component',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent {
  parentUrl: string;

  constructor(private authService: UserAuthenticationService, private router: ActivatedRoute) {
    this.parentUrl = router.snapshot.parent.url[0].path;
  }

  isActive(url) {
    return this.router.url === url;
  }
}
