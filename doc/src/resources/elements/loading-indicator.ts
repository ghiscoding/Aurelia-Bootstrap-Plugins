import * as nprogress from 'nprogress';
import {bindable, noView} from 'aurelia-framework';

@noView()
export class LoadingIndicator {
  @bindable loading: boolean = false;

  loadingChanged(newValue: boolean) {
    if(newValue) {
      nprogress.start();
    }else {
      nprogress.done();
    }
  }
}
