import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class LoadingHandlerService extends Service {
  @tracked canAddOrEdit = false;
  @tracked canDelete = false;
}
