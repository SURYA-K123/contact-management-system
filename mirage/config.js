import { discoverEmberDataModels } from 'ember-cli-mirage';
import { createServer } from 'miragejs';

export default function (config) {
  let finalConfig = {
    ...config,
    models: {
      ...discoverEmberDataModels(config.store),
      ...config.models,
    },
    routes,
  };
  return createServer(finalConfig);
}

function routes() {
  this.namespace = '/api';
  this.timing = 500;
  this.get('/contacts', (schema, request) => {
    let contacts = schema.db.contacts;
    let { sort, filter, search, favourite } = request.queryParams;

    if (search) {
      let lowerSearch = search.toLowerCase();
      contacts = contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(lowerSearch) ||
          contact.email.toLowerCase().includes(lowerSearch) ||
          contact.phone.includes(search)
      );
    }

    if (favourite) {
      contacts = contacts.filter((contact) => contact.isFavourite);
    }

    if (filter && filter !== 'All') {
      contacts = contacts.filter((contact) => contact.relationship === filter);
    }

    if (sort) {
      contacts = contacts.sort((a, b) => {
        if (a[sort] < b[sort]) return -1;
        if (a[sort] > b[sort]) return 1;
        return 0;
      });
    }
    contacts = contacts.map(
      ({ id, name, relationship, phone, email, isFavourite }) => ({
        id,
        name,
        relationship,
        phone,
        email,
        isFavourite,
      })
    );

    return {
      code: 0,
      contacts,
      message: 'Contacts successfully fetched',
    };
  });

  this.post('/contacts', (schema, request) => {
    const attrs = JSON.parse(
      new URLSearchParams(request.requestBody).get('JSONString')
    );
    const data = schema.contacts.create(attrs);
    return data;
  });

  this.get('/contacts/:id', (schema, request) => {
    const contactId = request.params.id;
    const contact = schema.contacts.find(contactId);

    return {
      code: 0,
      contact: contact,
      message: 'Contact successfully fetched',
    };
  });

  this.put('/contacts/:id', (schema, request) => {
    let id = request.params.id;
    const newData = JSON.parse(
      new URLSearchParams(request.requestBody).get('JSONString')
    );
    const contact = schema.contacts.find(id);
    contact.update(newData);
    return {
      code: 0,
      message: 'Contact Successfully updated',
      contact: newData,
    };
  });

  this.del('/contacts/:id', (schema, request) => {
    let id = request.params.id;
    let contact = schema.contacts.find(id);
    contact.destroy();
    return {
      code: 0,
      message: 'Contact Successfully deleted',
      contact: contact,
    };
  });
}
