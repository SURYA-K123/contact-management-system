import Controller from '@ember/controller';
import { action } from '@ember/object';
import {inject as service} from '@ember/service';

export default class EditController extends Controller {
  @service loadingHandler;
  @action
  updateContact(contact) {
    this.target.send('updateContact', contact);
  }

  @action
  addContact(contact) {
    this.target.send('addContact', contact);
  }
}
