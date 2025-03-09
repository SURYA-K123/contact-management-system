import CommonResource from '@zoho/ember-model-library/models/common/resource';

function isValidName(name) {
  const nameRegex = /^[A-Za-z\s]+$/;
  return nameRegex.test(name);
}

function isValidPhone(phone) {
  const phoneRegex =
    /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
  return phoneRegex.test(phone);
}

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function capitalize(name) {
  if (!name) return '';

  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

let ContactModel = CommonResource.extend({
  resourceUrl: '/api/contacts',
  resourceName: 'contact',
  resourceProperties: [
    'name',
    'relationship',
    'phone',
    'email',
    'isFavourite',
    'address',
    'about',
  ],
  resourceIdField: 'id',

  validate() {
    let errors = [];
    let errorMessages = {};
    if (!this.name) {
      errorMessages.name = 'Please fill the name first';
    } else if (!isValidName(this.name)) {
      errorMessages.name = 'Enter the valid name';
    }
    if (!this.relationship) {
      errorMessages.relationship = 'please select the relationship type';
    }
    if (!this.phone) {
      errorMessages.phone = 'Please enter the phone number';
    } else if (!isValidPhone(this.phone)) {
      errorMessages.phone = 'Enter the valid phone number';
    }
    if (!this.email) {
      errorMessages.email = 'Please enter the email';
    } else if (!isValidEmail(this.email)) {
      errorMessages.email = 'Enter the valid email';
    }
    // if (!this.address) {
    //   errorMessages.address = 'Please fill the address field';
    // }
    // if (!this.about) {
    //   errorMessages.about = 'Please fill the description';
    // }

    if (Object.keys(errorMessages).length > 0) {
      errors.push(errorMessages);
    }
    return errors;
  },

  serializeProperty(property) {
    if (property === 'name') {
      return capitalize(this.name);
    } else if (property === 'email') {
      return this.email.toLowerCase();
    }
    return this._super(property);
  },

  prepareData(payloadBody, serializedObj) {
    payloadBody.JSONString = JSON.stringify(serializedObj);
    return payloadBody;
  },
});

ContactModel.reopenClass({
  responsePath: 'contacts',
});

export default ContactModel;
