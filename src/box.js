import Vector from './vector';

/**
 * Represents a box with normalized position vectors.
 */
export default class Box {
  /**
   * @param {!Vector} a
   * @param {!Vector} b
   */
  constructor(a, b) {
    /** type {number} */ this.startX = Math.min(a.x, b.x);
    /** type {number} */ this.startY = Math.min(a.y, b.y);
    /** type {number} */ this.endX = Math.max(a.x, b.x);
    /** type {number} */ this.endY = Math.max(a.y, b.y);
  }

  /** @return {!Vector} */
  topLeft() {
    return new Vector(this.startX, this.startY);
  }

  /** @return {!Vector} */
  bottomRight() {
    return new Vector(this.endX, this.endY);
  }

  /**
   * @param {!Vector} position
   * @return {boolean} Whether position is contained in the box.
   */
  contains(position) {
    return position.x >= this.startX && position.x <= this.endX
        && position.y >= this.startY && position.y <= this.endY;
  }

  /**
   * Return true if two boxes overlap.
   * @param {!Box} box
   * @return {boolean} Whether this box overlaps the given box.
   */
  overlaps(box) {
    // one box is on left side of other
    if (this.startX > box.endX || box.startX > this.endX) {
      return false
    }

    // one box is above other
    if (this.startY > box.endY || box.startY > this.endY) {
      return false;
    }

    return true;
  }
}
