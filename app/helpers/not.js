import { helper } from '@ember/component/helper';

export default helper(function not([arg]) {
  return !arg;
});
