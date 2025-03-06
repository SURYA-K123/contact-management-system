import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ModalModalTemplateComponent extends Component {
  @action
  onclose() {
    if (this.args.onclose) {
      this.args.onclose();
    }
  }
}
