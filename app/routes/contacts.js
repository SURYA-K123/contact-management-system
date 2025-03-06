import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ContactsRoute extends Route {
  @service store;
  @service favourites;
  applicationController;

  beforeModel() {
    this.applicationController = this.controllerFor('application');
    this.applicationController.set('isMainLoaderActive', true);
  }

  async model(params, transition) {
    if (
      transition.from?.name === 'edit' &&
      transition.to.name === 'contacts.contact'
    ) {
      return;
    } else {
      return await this.store.findAll('contact', {
        sort: params.sortby,
        filter: params.filterby,
      });
    }
  }

  afterModel() {
    this.applicationController.set('isMainLoaderActive', false);
  }

  setupController(controller, model, transition) {
    super.setupController(...arguments);
    if (
      transition.from?.name === 'edit' &&
      transition.to.name === 'contacts.contact'
    ) {
      return;
    } else {
      controller.set('contacts', model);
    }
  }

  @action
  async toggleFavourite(contact) {
    await this.favourites.toggleFavourite(contact);
    this.refresh();
  }
}
