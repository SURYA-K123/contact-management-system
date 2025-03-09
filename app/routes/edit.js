import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class EditRoute extends Route {
  @service store;
  @service router;
  @service loadingHandler;

  async model(params) {
    let data;
    this.loadingHandler.isMainLoaderActive = true;
    if (params.id) {
      data = await this.store.find('contact', params.id);
    }
    this.loadingHandler.isMainLoaderActive = false;
    return data;
  }

  @action
  async addContact(data) {
    this.loadingHandler.canAddOrEdit = true;
    let contact = this.store.createRecord('contact', data);
    this.controller.set('contact', contact);
    try {
      let id;
      await contact.saveRecord().then(({ data }) => {
        id = data.id;
      });
      let modalElement = document.getElementById('onadd');
      if (modalElement) {
        let modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
      contact.id = id;
      this.router.transitionTo('contacts.contact', contact);
    } catch (e) {
      setTimeout(() => {
        this.controller.set('contact.errorMessages', []);
      }, 2000);
    } finally {
      this.loadingHandler.canAddOrEdit = false;
    }
  }

  @action
  async updateContact(contact) {
    this.loadingHandler.canAddOrEdit = true;
    let editController = this.controllerFor('edit');
    editController.set('contact', contact);
    try {
      await contact.saveRecord();
      let modalElement = document.getElementById('onedit');
      if (modalElement) {
        let modal = new bootstrap.Modal(modalElement);
        modal.show();
      }
      this.controllerFor('contacts').updateContact(contact);
      this.router.transitionTo('contacts.contact', contact);
    } catch (e) {
      setTimeout(() => {
        editController.set('contact.errorMessages', []);
      }, 2000);
    } finally {
      this.loadingHandler.canAddOrEdit = false;
    }
  }
}
