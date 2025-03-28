import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | eq', function (hooks) {
  setupRenderingTest(hooks);

  // TODO: Replace this with your real tests.
  test('it renders', async function (assert) {
    this.set('inputValue', '1234');

    await render(hbs`{{eq this.inputValue '1234'}}`);
    assert.dom(this.element).hasText('true');

    await render(hbs`{{eq true 'true'}}`);
    assert.dom(this.element).hasText('false');

    await render(hbs`{{eq 1234 '1234'}}`);
    assert.dom(this.element).hasText('false');

    await render(hbs`{{eq 'surya' 'surya'}}`);
    assert.dom(this.element).hasText('true');
  });
});
