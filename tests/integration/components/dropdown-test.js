import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | dropdown', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('text', 'name');

    this.set('change', (value) => {
      this.set('text', value);
    });

    await render(
      hbs`<Dropdown @buttonText={{concat 'sortby:' this.text}} @options={{array 'name' 'phone'}} @onOptionSelected={{this.change}}/>`
    );

    assert.dom('.dropdown-toggle').hasText('sortby:name');

    assert.strictEqual(findAll('li').length, 2, 'The list contains 2 items.');
    assert.dom('li:nth-child(1)').hasText('name');

    await click('li:nth-child(2)', 'Button clicked');
    assert.dom('.dropdown-toggle').hasText('sortby:phone', 'Dropdown text changes');
  });
});
