import { Component, AfterViewInit, HostListener  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar-component',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements AfterViewInit {
  parentUrl: string;
  windowWidth: number = window.innerWidth;

  constructor(private router: ActivatedRoute) {
    this.parentUrl = router.snapshot.parent.url[0].path;
  }

  ngAfterViewInit() {
    this.windowWidth = window.innerWidth;
  }

  isActive(url: any) {
    return this.router.url === url;
  }

  @HostListener('window:resize', ['$event'])
  resize(event: any) {
      this.windowWidth = window.innerWidth;
  }
}
