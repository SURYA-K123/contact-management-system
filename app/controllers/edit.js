import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class EditController extends Controller {
  @action
  updateContact(contact) {
    this.target.send('updateContact', contact);
  }

  @action
  addContact(contact) {
    this.target.send('addContact', contact);
  }
}
