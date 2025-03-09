import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ContactFormComponent extends Component {
  id = this.args.data?.id || null;
  @tracked name = this.args.data?.name || '';
  @tracked relationship = this.args.data?.relationship || 'Friend';
  @tracked phone = this.args.data?.phone || '';
  @tracked email = this.args.data?.email || '';
  @tracked address = this.args.data?.address || '';
  @tracked about = this.args.data?.about || '';

  @tracked isAddModalVisible = false;
  @tracked isEditModalVisible = false;
  @tracked errorMessage = {};

  @service store;
  @service router;

  @service loadingHandler;

  @action
  updateValue(event) {
    let field = event.target.name;
    switch (field) {
      case 'name':
        this.name = event.target.value;
        break;
      case 'relationship':
        this.relationship = event.target.value;
        break;
      case 'phone':
        this.phone = event.target.value;
        break;
      case 'email':
        this.email = event.target.value;
        break;
      case 'address':
        this.address = event.target.value;
        break;
      case 'about':
        this.about = event.target.value;
        break;
    }
  }

  @action
  performAction(event) {
    event.preventDefault();
    if (this.args.data) {
      this.updateData(this.args.data);
    } else {
      this.addData();
    }
  }

  @action
  async addData() {
    const data = {
      name: this.name,
      relationship: this.relationship,
      phone: this.phone,
      email: this.email,
      address: this.address,
      about: this.about,
      isFavourite: false,
    };
    await this.args.onAdd(data);
    this.canAdd = false;
  }

  @action
  updateData(contact) {
    contact.name = this.name;
    contact.relationship = this.relationship;
    contact.phone = this.phone;
    contact.email = this.email;
    contact.address = this.address;
    contact.about = this.about;
    this.args.onEdit(contact);
  }
}
