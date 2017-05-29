import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../services/user-authentication.service';
import { Router } from '@angular/router';
import { Store, Action } from '@ngrx/store';
import { NEWCLIENTS, ADDCLIENT, DELETECLIENT, CHANGECLIENT } from '../clients/reducers/chart.reducer';

@Component({
  selector: 'app-sidebar-component',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit{
  
  constructor(private authService: UserAuthenticationService, private router: Router, private store: Store<any>) {}
  ngOnInit() {
  } 
  addToStore() {
      this.store.dispatch({ type: NEWCLIENTS, payload: {'hello': 'Hola'}});
  }
  isActive(url) {
    return this.router.url === url;
  }
}