import Service from '@ember/service';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class FavouritesService extends Service {
  @service router;
  @tracked favourites = A([]);

  @action
  async toggleFavourite(contact) {
    contact.isFavourite = !contact.isFavourite;
    await contact.saveRecord();

    if (contact.isFavourite) {
      this.favourites.pushObject(contact);
    } else {
      this.favourites = this.favourites.filter((fav) => fav.id !== contact.id);
    }
  }
}
