import Box from './box';
import Star from './star';
import * as debug from './debug';
import { LOG, log } from './logging';
import { Variables } from './variables';

export default class State {
  constructor() {
    /** @private {!Array<!Array<!Star>>} */
    this.stars = [[], []];
    /** @private {number} */
    this.size = 0;
    /** @private {number} */
    this.delta = 0;
  }

  /**
   * @param {!Star} star
   */
  addStar(star) {
    this.stars[1].push(star);
    ++this.size;
  }

  /**
   * Remove the given star. As an optimization, doesn't remove the star
   * but marks it as not to be rendered any more. Once a star lifespan
   * of time has elapsed, the stars will be garbage collected.
   * @param {!Star} star
   */
  removeStar(star) {
    star.living = false;
    --this.size;
  }

  /**
   * @return {number}
   */
  countStars() {
    return this.size;
  }

  /**
   * Return true if there is still room for more stars.
   * @return {boolean}
   */
  hasRoom() {
    return this.countStars() < Variables['MAX_STAR_COUNT'];
  }

  /**
   * Call fn for each star in the state.
   * @param {function(!Star)} fn
   */
  eachStar(fn) {
    this.stars.forEach(array => {
      array.forEach(fn);
    });
  }

  /**
   * Shift the star array over one and null out the previous star array.
   */
  shiftStars() {
    this.stars = this.stars.slice(1);
    this.stars.push([]);
  }

  /**
   * Update the positions of all the stars.
   * Remove a star once it is outside the bounds.
   * @param {number} delta The amound of time elapsed, in millis,
   *     since the last call.
   * @param {!Box} bounds The bounding box of the stars.
   */
  tick(delta, bounds) {
    this.delta += delta / 1000;
    const lifespan = Variables['LIFESPAN']
    if (this.delta >= lifespan) {
      this.shiftStars();
      this.delta -= lifespan;
    }
    this.eachStar(star => {
      star.tick(delta / 1000);
      if (this.shouldRemoveStar(star, bounds, lifespan)) {
        this.removeStar(star);
        LOG && log('%c removed star %s', `color: ${star.color}`, star.toString());
      }
    });
    debug.set('STAR_COUNT', this.countStars());
  }

  /**
   * Determine if a star should be removed based on the bounds of
   * the window and the configured lifespan.
   * @param {!Star} star
   * @param {!Box} bounds
   * @param {number} lifespan
   * @return {boolean}
   */
  shouldRemoveStar(star, bounds, lifespan) {
    if (!star.living) return false;
    return !bounds.overlaps(star.getBounds()) || star.age >= lifespan;
  }
}
