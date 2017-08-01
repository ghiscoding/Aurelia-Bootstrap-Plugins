import {customAttribute, inject} from 'aurelia-framework';
import $ from "jquery";

@customAttribute('bootstrap-tooltip')
@inject(Element)
export class BootstrapTooltip {
  constructor(element) {
    this.element = element;
  }

  bind() {
    $(this.element).tooltip();
  }

  unbind() {
    $(this.element).tooltip('dispose');
  }
}
