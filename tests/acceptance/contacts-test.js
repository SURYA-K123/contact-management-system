import { module, test } from 'qunit';
import {
  visit,
  currentURL,
  findAll,
  click,
  fillIn,
  settled,
} from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | contacts', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /contacts', async function (assert) {
    await visit('/contacts');

    assert.equal(currentURL(), '/contacts');
    assert.strictEqual(
      findAll('.dropdown-wrapper .dropdown').length,
      2,
      'Dropdowns rendered'
    );
    assert.dom('[data-test-search-bar]').exists('Search Bar exists');
    assert.dom('[data-test-add-button]').exists('Add button exists');

    assert.dom('[data-test-contacts-table]').exists('Table exists');

    assert.dom('[data-test-table-head]').exists('Head exists');
    assert.dom('[data-test-table-body] tr').exists({ count: 16 });
  });

  test('visiting /contacts?filterby=Family', async function (assert) {
    await visit('/contacts?filterby=Family');
    assert.equal(currentURL(), '/contacts?filterby=Family');

    assert.strictEqual(
      findAll('.dropdown-wrapper .dropdown').length,
      2,
      'Dropdowns rendered'
    );
    assert.dom('[data-test-search-bar]').exists('Search Bar exists');
    assert.dom('[data-test-add-button]').exists('Add button exists');

    assert.dom('[data-test-contacts-table]').exists('Table exists');

    assert.dom('[data-test-table-head]').exists('Head exists');
    assert.dom('[data-test-table-body] tr').exists({ count: 4 });
    assert
      .dom('[data-test-table-body] tr:first-child .contact-name')
      .hasText('Jane Smith');
  });

  test('visiting /contacts?filterby=Friend&sortby=phone', async function (assert) {
    await visit('/contacts?filterby=Friend&sortby=phone');
    assert.equal(currentURL(), '/contacts?filterby=Friend&sortby=phone');

    assert.strictEqual(
      findAll('.dropdown-wrapper .dropdown').length,
      2,
      'Dropdowns rendered'
    );
    assert.dom('[data-test-search-bar]').exists('Search Bar exists');
    assert.dom('[data-test-add-button]').exists('Add button exists');

    assert.dom('[data-test-contacts-table]').exists('Table exists');

    assert.dom('[data-test-table-head]').exists('Head exists');
    assert.dom('[data-test-table-body] tr').exists({ count: 4 });
    assert
      .dom('[data-test-table-body] tr:first-child .contact-name')
      .hasText('David Harris');
  });

  test('visiting /contacts/9', async function (assert) {
    await visit('/contacts/9');
    assert.equal(currentURL(), '/contacts/9');

    assert.strictEqual(
      findAll('.dropdown-wrapper .dropdown').length,
      2,
      'Dropdowns rendered'
    );
    assert.dom('[data-test-search-bar]').exists('Search Bar exists');
    assert.dom('[data-test-add-button]').exists('Add button exists');

    assert.dom('[data-test-contacts-list]').exists('Contact List exists');
    assert.dom('[data-test-view-contact]').exists('Contact details displayed');

    assert.dom('[data-test-view-contact-name] .value').hasText('David Harris');

    await click('[data-test-edit-contact-button]');
    assert.equal(currentURL(), '/9/edit');
  });

  test('visiting /7/edit', async function (assert) {
    await visit('/7/edit');

    assert.dom('[data-test-contact-form-name]').hasValue('Chris Taylor');
    assert.dom('[data-test-contact-form-relationship]').hasValue('Colleague');

    await fillIn('[data-test-contact-form-name]', 'Tom lathem');

    await click('[data-test-contact-form-save]');
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    await settled();

    assert.equal(currentURL(), '/contacts/7?filterby=All&sortby=name');
    await click('[data-test-modal-close-button]');

    assert.dom('[data-test-view-contact-name] .value').hasText('Tom Lathem');
  });

  test('visiting /new', async function (assert) {
    await visit('/new');

    assert.dom('[data-test-contact-form-name]').hasValue('');
    assert.dom('[data-test-contact-form-relationship]').hasValue('Friend');

    await fillIn('[data-test-contact-form-name]', 'Tom lathem');
    await fillIn('[data-test-contact-form-relationship]', 'Colleague');
    await fillIn('[data-test-contact-form-phone]', '9876543210');
    await fillIn('[data-test-contact-form-email]', 'tom@example.com');
    await fillIn('[data-test-contact-form-address]', 'abcd');
    await fillIn('[data-test-contact-form-about]', 'abcd');

    await click('[data-test-contact-form-save]');
    await settled();
    await click('[data-test-modal-close-button]');

    assert.equal(
      currentURL(),
      '/contacts/17?filterby=All&sortby=name',
      'URL changed'
    );

    await click('[data-test-modal-close-button]');

    assert.dom('[data-test-view-contact-name] .value').hasText('Tom lathem');

    await visit('/contacts');
    await settled();

    assert.dom('[data-test-table-body] tr').exists({ count: 17 });
  });

  test('visiting /contacts/9', async function (assert) {
    await visit('/contacts/9');
    assert.equal(currentURL(), '/contacts/9');

    assert.strictEqual(
      findAll('.dropdown-wrapper .dropdown').length,
      2,
      'Dropdowns rendered'
    );
    assert.dom('[data-test-search-bar]').exists('Search Bar exists');
    assert.dom('[data-test-add-button]').exists('Add button exists');

    assert.dom('[data-test-contacts-list]').exists('Contact List exists');
    assert.dom('[data-test-view-contact]').exists('Contact details displayed');

    assert.dom('[data-test-view-contact-name] .value').hasText('David Harris');

    await click('[data-test-delete-contact-button]');

    await click('.yes-btn');

    await click('[data-test-modal-close-button]');
    await settled();

    assert.equal(currentURL(), '/contacts?filterby=All&sortby=name');

    await click('[data-test-modal-close-button]');

    assert.dom('[data-test-table-body] tr').exists({ count: 15 });
  });
});
