import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | nothing', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Nothing />`);

    assert
      .dom(this.element.querySelector('.nothing-content img'))
      .exists('Image render in nothing template');
    assert
      .dom(this.element.querySelector('.nothing-content strong'))
      .hasText('Nothing in favourites!', 'Text displayed');
  });
});
