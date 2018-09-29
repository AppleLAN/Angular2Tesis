import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export interface LoaderState {
  show: boolean;
}

@Injectable()
export class SpinnerService {
  private loaderStatusState = new Subject<any>();
  loaderStatus = this.loaderStatusState.asObservable();

  constructor() {}

  displayLoader(value: boolean) {
    this.loaderStatusState.next(<LoaderState>{ show: value });
  }
}
