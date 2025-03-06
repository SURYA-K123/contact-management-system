import Controller from '@ember/controller';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ContactsController extends Controller {
  @service router;
  @service store;

  queryParams = ['sortby', 'filterby'];

  @tracked enteredChild = false;
  @tracked isContactLoaded = false;
  @tracked isEditLoading = false;
  @tracked isContactsLoaderActive = false;

  @tracked contacts = A([]);

  @tracked sortby = 'name';
  @tracked filterby = 'All';

  @tracked searchedContacts = null;
  @tracked name;

  get data() {
    return this.contacts;
  }

  async loadData() {
    this.isContactsLoaderActive = true;
    // await this.store
    //   .getJSON(`/api/contacts?sort=${this.sortby}&filter=${this.filterby}`)
    //   .then(({ contacts }) => {
    //     this.contacts = contacts;
    //   });
    this.contacts = await this.store.findAll('contact', {
      sort: this.sortby,
      filter: this.filterby,
    });
    this.isContactsLoaderActive = false;
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
  updateContact(contactToUpdate) {
    this.contacts = this.contacts.map((contact) =>
      contact.id === contactToUpdate.id
        ? Object.fromEntries(
            Object.entries(contact).map(([key, value]) => [
              key,
              contactToUpdate[key] ?? value,
            ])
          )
        : contact
    );
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
  toggleFavourite(contact) {
    this.target.send('toggleFavourite', contact);
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
