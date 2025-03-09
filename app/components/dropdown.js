import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class DropdownComponent extends Component {
  @action
  doActionForSelectedOption(option) {
    this.args.onOptionSelected(option);
  }
}
