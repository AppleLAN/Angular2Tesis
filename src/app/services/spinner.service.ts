import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface LoaderState {
  show: boolean;
}

@Injectable()
export class SpinnerService {
  private loaderStatusState = new BehaviorSubject<any>(false);
  loaderStatus = this.loaderStatusState.asObservable();

  constructor() {}

  displayLoader(value: boolean) {
    this.loaderStatusState.next(<LoaderState>{ show: value });
  }
}
