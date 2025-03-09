import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ContactsRoute extends Route {
  @service store;
  @service favourites;
  @service loadingHandler;

  async model(params, transition) {
    if (
      transition.from?.name === 'edit' &&
      transition.to.name === 'contacts.contact'
    ) {
      return;
    }
    this.loadingHandler.isMainLoaderActive = true;
    const { contacts } = await this.store.getJSON(
      `/api/contacts?filter=${params.filterby}&sort=${params.sortby}`
    );
    this.loadingHandler.isMainLoaderActive = false;
    return contacts;
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
  refreshDetails(){
    this.refresh();
  }
}
