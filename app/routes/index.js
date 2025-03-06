import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service store;
  async model() {
    let controller = this.controllerFor('application');
    controller.set('isMainLoaderActive', true);
    return await this.store.findAll('contact');
  }
  async afterModel() {
    let controller = this.controllerFor('application');
    controller.set('isMainLoaderActive', false);
  }
}
