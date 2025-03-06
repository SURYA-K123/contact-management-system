import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ContactsContactRoute extends Route {
  @service store;
  @service router;
  @service favourites;
  @service loadingHandler;

  contactsController;

  beforeModel() {
    this.contactsController = this.controllerFor('contacts');
    this.contactsController.set('enteredChild', true);
    this.contactsController.set('isContactLoaded', false);
  }

  model(params) {
    return this.store.find('contact', params.id);
  }

  afterModel() {
    this.contactsController.set('isContactLoaded', true);
  }

  deactivate() {
    super.deactivate(...arguments);
    this.contactsController.set('enteredChild', false);
  }

  @action
  async toggleFavourite(contact) {
    await this.favourites.toggleFavourite(contact);
    this.refresh();
  }

  @action
  async deleteContact(contact) {
    this.loadingHandler.canDelete = true;
    let controller = this.controllerFor('contacts.contact');
    controller.deleteModal.hide();
    try {
      await contact.destroyRecord();
      let onDeleteModalElement = document.getElementById('ondelete');
      let onDeleteModal = new bootstrap.Modal(onDeleteModalElement);
      onDeleteModal.show();
      this.router.transitionTo('contacts');
      this.controllerFor('contacts').removeContact(contact.id);
    } catch (e) {
      console.log(e);
    } finally {
      this.loadingHandler.canDelete = false;
    }
  }
}
