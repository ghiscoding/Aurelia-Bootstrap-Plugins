import {bindable, inject} from 'aurelia-framework';
import {
  ValidationControllerFactory,
  ValidationController,
  ValidationRules
} from 'aurelia-validation';
import {BootstrapFormRenderer} from './bootstrap-form-renderer';

@inject(ValidationControllerFactory)
export class RegistrationForm {
  @bindable selectCamping;
  firstName = '';
  lastName = '';
  email = '';
  controller = null;
  allCampingStuff = ['Tent', 'Flashlight', 'Sleeping Bag'];
  
  constructor(controllerFactory) {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
  }
  
  submit() {
    this.controller.validate();
  }
}

ValidationRules
  .ensure(a => a.firstName).required()
  .ensure(a => a.lastName).required()
  .ensure(a => a.email).required().email()
  .ensure(a => a.categories).required()
  .ensure(a => a.dateEntered).required()
  .ensure(a => a.camping).required()
  .on(RegistrationForm);
