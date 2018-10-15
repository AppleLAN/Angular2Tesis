import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [SpinnerService]
})
export class AppComponent implements OnInit {
  show: boolean;

  constructor(public spinnerService: SpinnerService) {}

  ngOnInit() {
    this.spinnerService.loaderStatus.subscribe(state => {
      setTimeout(() => {
        this.show = state.show;
      }, 0);
    });
  }
}
