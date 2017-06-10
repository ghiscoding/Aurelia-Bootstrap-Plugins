import {bindable, inject} from 'aurelia-framework';
import {ValidationController, ValidationControllerFactory, ValidationRules} from 'aurelia-validation';
import {BootstrapFormRenderer} from './bootstrap-form-renderer';

@inject(ValidationControllerFactory)
export class ValidationForm {
  firstName = '';
  lastName = '';
  email = '';
  controller = null;
  campingCollection = ['Tent', 'Flashlight', 'Sleeping Bag'];

  constructor(controllerFactory) {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
  }

  submit() {
    this.controller.validate();
  }
}

ValidationRules
  .ensure('firstName').required()
  .ensure('lastName').required()
  .ensure('email').required().email()
  .ensure('categories').required()
  .ensure('dateEntered').required()
  .ensure('camping').minItems(1)
  .on(ValidationForm);
