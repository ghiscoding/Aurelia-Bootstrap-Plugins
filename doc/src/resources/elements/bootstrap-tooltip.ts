import {inject, customAttribute} from 'aurelia-framework';
import * as $ from 'jquery';

@customAttribute('bootstrap-tooltip')
@inject(Element)
export class BootstrapTooltip {
  element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  bind() {
    $(this.element).tooltip();
  }

  unbind() {
    $(this.element).tooltip('dispose');
  }
}
