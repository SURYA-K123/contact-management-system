import { helper } from '@ember/component/helper';

export default helper(function or([left, right]) {
  return left || right;
});
