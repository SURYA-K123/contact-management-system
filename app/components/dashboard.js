import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class DashboardComponent extends Component {
  @service favourites;

  @tracked totalFriends = 0;
  @tracked totalFamily = 0;
  @tracked totalColleagues = 0;
  @tracked totalOthers = 0;

  @tracked totalFavouriteFriends = 0;
  @tracked totalFavouriteFamily = 0;
  @tracked totalFavouriteColleagues = 0;
  @tracked totalFavouriteOthers = 0;

  constructor() {
    super(...arguments);
    this.calculateTotals();
    this.calculateFavouriteTotals();
  }

  @action
  calculateTotals() {
    let friends = 0;
    let family = 0;
    let colleagues = 0;
    let others = 0;

    this.args.contacts.forEach((contact) => {
      switch (contact.relationship) {
        case 'Friend':
          friends++;
          break;
        case 'Family':
          family++;
          break;
        case 'Colleague':
          colleagues++;
          break;
        case 'Other':
          others++;
          break;
      }
    });

    this.totalFriends = friends;
    this.totalFamily = family;
    this.totalColleagues = colleagues;
    this.totalOthers = others;
  }

  @action
  calculateFavouriteTotals() {
    let favFriends = 0;
    let favFamily = 0;
    let favColleagues = 0;
    let favOthers = 0;

    this.args.contacts.forEach((contact) => {
      if (contact.isFavourite) {
        switch (contact.relationship) {
          case 'Friend':
            favFriends++;
            break;
          case 'Family':
            favFamily++;
            break;
          case 'Colleague':
            favColleagues++;
            break;
          case 'Other':
            favOthers++;
            break;
        }
      }
    });

    this.totalFavouriteFriends = favFriends;
    this.totalFavouriteFamily = favFamily;
    this.totalFavouriteColleagues = favColleagues;
    this.totalFavouriteOthers = favOthers;
  }

  get totalContacts() {
    return [
      { class: 'friends', total: this.totalFriends },
      { class: 'family', total: this.totalFamily },
      { class: 'colleagues', total: this.totalColleagues },
      { class: 'others', total: this.totalOthers },
    ];
  }

  get totalFavouriteContacts() {
    return [
      { class: 'friends', total: this.totalFavouriteFriends },
      { class: 'family', total: this.totalFavouriteFamily },
      { class: 'colleagues', total: this.totalFavouriteColleagues },
      { class: 'others', total: this.totalFavouriteOthers },
    ];
  }
}
