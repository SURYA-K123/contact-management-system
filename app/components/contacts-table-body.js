import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ContactsTableBodyComponent extends Component {
  @service router;
  @service store;

  @action
  viewContact(id) {
    this.router.transitionTo('contacts.contact', id);
  }

  @action
  toggleFavourite(contact, event) {
    event.stopPropagation();
    this.args.toggleFavourite(contact);
  }

  @action
  updateName(event) {
    event.stopPropagation();
    this.args.updateName(this.args.details.name);
  }
}
