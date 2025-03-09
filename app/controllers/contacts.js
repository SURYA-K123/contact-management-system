import Controller from '@ember/controller';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ContactsController extends Controller {
  @service router;
  @service store;
  @service loadingHandler;

  queryParams = ['sortby', 'filterby'];

  @tracked sortby = 'name';
  @tracked filterby = 'All';

  @tracked enteredChild = false;
  @tracked isContactLoaded = false;

  @tracked contacts = A([]);

  @tracked searchedContacts = null;
  @tracked name;

  async loadData() {
    this.loadingHandler.isContactsLoaderActive = true;
    const { contacts } = await this.store.getJSON(
      `/api/contacts?filter=${this.filterby}&sort=${this.sortby}`
    );
    this.contacts = contacts;
    this.loadingHandler.isContactsLoaderActive = false;
  }

  @action
  updateQueryParamChange(qpName, value) {
    if (qpName === 'sort') {
      if (this.sortby !== value) {
        this.sortby = value;
        this.loadData();
      }
    } else {
      if (this.filterby !== value) {
        this.filterby = value;
        this.loadData();
      }
    }
  }

  @action
  refreshDetails(){
    this.target.send('refreshDetails');
  }

  @action
  updateContact(contactToUpdate) {
    this.contacts = this.contacts.map((contact) => {
      if (contact.id === contactToUpdate.id) {
        let updatedContact = { ...contact };
        Object.keys(contact).forEach((key) => {
          if (contactToUpdate.hasOwnProperty(key)) {
            updatedContact[key] = contactToUpdate[key];
          }
        });
        return updatedContact;
      }
      return contact;
    });
  }

  @action
  removeContact(id) {
    this.contacts = this.contacts.filter((contact) => contact.id !== id);
  }

  @tracked searchValue = '';

  get searchedData() {
    return this.searchedContacts;
  }

  @action
  async searchContacts() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(async () => {
      this.store
        .getJSON(`/api/contacts?search=${this.searchValue}`)
        .then(({ contacts }) => {
          this.searchedContacts = contacts;
        });
    }, 300);
  }

  @action
  addContact(data) {
    this.target.send('addContact', data);
  }

  @action
  async toggleFavourite(contact) {
    contact.isFavourite = !contact.isFavourite;
    try {
      let contactInstance = this.store.createRecord('contact', contact);
      await contactInstance.saveRecord();
      this.updateContact(contact);
    } catch (e) {
      console.log(e);
    }
  }

  @action
  goToAdd() {
    this.router.transitionTo('new');
  }

  @action
  updateName(name) {
    this.name = name;
  }
}
