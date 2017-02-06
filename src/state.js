import Box from './box';
import Star from './star';
import Debug from './debug';
import { LOG, log } from './logging';
import { Variables } from './variables';

export default class State {
  constructor() {
    /** @private {!Object<number, !Star>} */
    this.stars = {};
    this.debug = Debug.getInstance();
  }

  /**
   * @param {!Star} star
   */
  addStar(star) {
    this.stars[star.id] = star;
  }

  /**
   * @param {!Star|number} id Either a star or an id.
   */
  removeStar(id) {
    if (id instanceof Star) {
      id = id.id;
    }
    delete this.stars[id];
  }

  /**
   * @return {number}
   */
  countStars() {
    return Object.keys(this.stars).length;
  }

  /**
   * Return true if there is still room for more stars.
   * @return {boolean}
   */
  hasRoom() {
    return this.countStars() < Variables['MAX_STAR_COUNT'];
  }

  /**
   * @return {!Array<!Star>} The existing stars.
   */
  getStars() {
    return Object.values(this.stars);
  }

  /**
   * Update the positions of all the stars.
   * Remove a star once it is outside the bounds.
   * @param {number} delta The amound of time elapsed, in millis, since the last call.
   * @param {!Box} bounds The bounding box of the stars.
   */
  tick(delta, bounds) {
    this.getStars().forEach(star => {
      star.tick(delta / 1000);
      if (!bounds.overlaps(star.getBounds())) {
        this.removeStar(star);
        LOG && log('%c removed star %s', `color: ${star.color}`, star);
      }
    });
    this.debug.set('STAR_COUNT', this.countStars());
  }
}
