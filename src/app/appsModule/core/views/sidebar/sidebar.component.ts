import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../../../services/user-authentication.service';
import { ActivatedRoute } from '@angular/router';
import { NEWCHARTDATA} from '../../../clients/reducers/chart.reducer';

@Component({
  selector: 'app-sidebar-component',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit{
  parentUrl : string;
  constructor(private authService: UserAuthenticationService, private router: ActivatedRoute) {
    this.parentUrl = router.snapshot.parent.url[0].path;
  }
  ngOnInit() {
  }
  
  isActive(url) {
    return this.router.url === url;
  }
}