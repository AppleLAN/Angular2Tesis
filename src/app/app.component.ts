import { Component } from '@angular/core';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [SpinnerService]
})
export class AppComponent {
  show: boolean;

  constructor(public spinnerService: SpinnerService) {}

  ngOnInit() {
    console.log('loaded');
    this.spinnerService.loaderStatus.subscribe(state => {
      console.log('subscribe');
      setTimeout(() => {
        this.show = state.show;
      }, 0);
    });
  }
}
