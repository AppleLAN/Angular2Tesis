import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  arrowImg: string;
  salesImg: string;
  stockImg: string;
  clientsImg: string;
  providersImg: string;
  apps: Object[];

  constructor(private authService: UserService) {}
  ngOnInit() {
     this.arrowImg = '../../assets/images/arrow-up.png';
     this.salesImg = '../../assets/images/sales.png';
     this.stockImg = '../../assets/images/stock.png';
     this.clientsImg = '../../assets/images/client.png';
     this.providersImg = '../../assets/images/provider.png';

     this.authService.getUserApps()
     .subscribe(
      response => {
        this.apps = response;
      },
      error => {
        console.log(error);
      }
    );
  }

  getAppImage (app: string) {
    let result: string;
    switch (app) {
      case 'sales':
        result = this.salesImg;
        break;
    case 'stock':
        result = this.stockImg;
        break;
    case 'clients':
        result = this.clientsImg;
        break;
    case 'providers':
        result = this.providersImg;
        break;
    }
    return result;
  }
}
