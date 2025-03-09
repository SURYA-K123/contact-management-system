import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ContactComponent extends Component {
  @service router;
  @service favourites;
  @service loadingHandler;

  @tracked hasData = this.args.details.id? true: false;

  @action
  showTable() {
    this.router.transitionTo('contacts');
  }
}
