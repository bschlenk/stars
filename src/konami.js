import { LOG, log } from './logging';

const LEFT = 37;
const UP = 38;
const RIGHT = 39;
const DOWN = 40;
const A = 65;
const B = 66;
const ENTER = 13;

/**
 * Activate an event when the konami code sequence is typed in.
 * UP UP DOWN DOWN LEFT RIGHT LEFT RIGHT B A ENTER
 */
export default class Konami {
  /**
   * @param {function()} action The action to run.
   * @private
   */
  constructor(action) {
    /** @private {function()} */
    this.action = action;
    /** @private {number} */
    this.index = 0;

    /**
     * @param {number} key The key to advance on.
     * @param {number=} indexOnFailure The index to go to on failure,
     *         or none to go back to zero
     * @return {function(number)}
     */
    const advanceOn = (key, indexOnFailure) => (val) => {
      const i = indexOnFailure || 0;
      if (val === key) {
        this.index += 1;
      } else {
        this.index = i;
      }
    };

    /** @const {!Array<function(number)>} */
    this.states = [
        advanceOn(UP),
        advanceOn(UP, 1),
        advanceOn(DOWN),
        advanceOn(DOWN),
        advanceOn(LEFT),
        advanceOn(RIGHT),
        advanceOn(LEFT),
        advanceOn(RIGHT),
        advanceOn(B),
        advanceOn(A),
        advanceOn(ENTER),
    ];

    this.installBindings();
  }

  /**
   * @param {number} key The key id if the key that was pressed.
   */
  handleKeypress(key) {
    this.states[this.index](key);
    LOG && log('konami index after key %d: %d', key, this.index);
    if (this.index === this.states.length) {
      LOG && log('konami code activated!');
      this.activate();
      this.index = 0;
    }
  }

  activate() {
    this.action();
  }

  installBindings() {
    document.documentElement.addEventListener('keydown', e => {
      this.handleKeypress(e.keyCode);
    });
  }
}
