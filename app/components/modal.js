import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ModalComponent extends Component {
  @tracked modalButtons = [];
  @tracked modalText = '';

  constructor() {
    super(...arguments);
    this.modalConfig();
  }

  @action
  onclose() {
    if (this.args.onclose) {
      this.args.onclose();
    }
  }

  modalConfig() {
    if (this.args.modalId === 'delete-confirm') {
      this.modalText = 'Are you sure to delete?';
      this.modalButtons = [
        {
          label: 'Yes',
          action: this.args.action,
          class: 'yes-btn',
        },
      ];
    } else if (this.args.modalId === 'ondelete') {
      this.modalText = 'Contact Successfully Deleted!';
    } else if (this.args.modalId === 'onedit') {
      this.modalText = 'Contact Successfully Updated!';
    } else if (this.args.modalId === 'onadd') {
      this.modalText = 'Contact Successfully Added!';
    } else if (this.args.modalId === 'call-modal') {
      this.modalText = `Call connected to `;
    }
  }
}
