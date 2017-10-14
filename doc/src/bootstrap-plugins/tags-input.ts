import {bindable, inject} from 'aurelia-framework';

@inject()
export class TagEdit {
  @bindable tag;
  post: any = {};

  constructor() {
    this.post = {
      categories: ['Javascript' , 'C#']
    };
  }

  tagChanged() {
    this.tag.events.onBeforeItemAdd = (e) => console.log('onBeforeItemAdd');
    this.tag.events.onBeforeItemRemove = (e) => console.log('onBeforeItemRemove');
    this.tag.events.onItemAdded = (e) => console.log('onItemAdded');
    this.tag.events.onItemAddedOnInit = (e) => console.log('onItemAddedOnInit');
    this.tag.events.onItemRemoved = (e) => console.log('onItemRemoved');
  }

  addTag() {
    this.tag.methods.add('Tag1');
  }

  removeAllTag() {
    setTimeout(() => this.tag.methods.removeAll(), 1000);
  }

  removeTag(tagName) {
    this.tag.methods.remove(tagName);
  }

  replaceAllTags() {
    this.post.categories = ['Erlang', 'Python'];
  }
}
