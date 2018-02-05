import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar-component',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent {
  parentUrl: string;

  constructor(private router: ActivatedRoute) {
    this.parentUrl = router.snapshot.parent.url[0].path;
  }

  isActive(url: any) {
    return this.router.url === url;
  }
}
