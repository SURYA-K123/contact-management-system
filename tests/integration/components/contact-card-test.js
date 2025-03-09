import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | contact-card', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('data', { name: 'surya', phone: '9876543210', isFavourite: true });
    this.set('toggleFavourite', () => {
      this.set('data', { ...this.data, isFavourite: !this.data.isFavourite });
    });

    await render(
      hbs`<ContactCard @data={{this.data}} @toggleFavourite={{this.toggleFavourite}}/>`
    );

    assert.dom('.contact-person-name').hasText('surya');
    assert.dom('.contact-person-phone-number').hasText('9876543210');
    assert.dom('.wishlist-icon').hasClass('is-favourite', 'Class exits');

    await click('.wishlist-icon');
    assert.dom('.wishlist-icon').doesNotHaveClass('is-favourite', 'class gone');

    await click('.wishlist-icon');
    assert.dom('.wishlist-icon').hasClass('is-favourite', 'class gone');
  });
});
