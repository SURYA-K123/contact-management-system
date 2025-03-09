import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ContactsContactController extends Controller {
  @service router;

  @tracked deleteModalElement;
  @tracked deleteModal;

  @tracked model;

  @action
  goToEdit(id) {
    this.router.transitionTo('edit', id);
  }

  @action
  toggleFavourite(contact) {
    this.target.send('toggleFavourite', contact);
  }

  @action
  showDeleteConfirmationModal() {
    this.deleteModalElement = document.getElementById('delete-confirm');
    this.deleteModal = new bootstrap.Modal(this.deleteModalElement);
    this.deleteModal.show();
  }

  @action
  deleteContact(contact) {
    this.target.send('deleteContact', contact);
  }
}
