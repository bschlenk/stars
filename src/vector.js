/** @const {number} */
export const PRECISION = 1e-6;

/**
 * Represents a vector from the origin.
 * Used both as a point and a vector throughout.
 * Vector objects are meant to be immutable.
 */
export default class Vector {
  /**
   * @param {number} x
   * @param {number} y
   * @return {!Vector}
   */
  constructor(x, y) {
    /** @const {number} */
    this.x = x;
    /** @const {number} */
    this.y = y;
  }

  /**
   * Convenience method for creating a new vector.
   * @param {number} x
   * @param {number} y
   * @return {!Vector}
   */
  static of(x, y) {
    return new Vector(x, y);
  }

  /**
   * @return {!Vector}
   */
  static zero() {
    return ZERO;
  }

  /**
   * Return a vector with identical x, y values.
   * @param {number} val
   * @return {!Vector}
   */
  static square(val) {
    return new Vector(val, val);
  }

  /**
   * Return a vector pointing in the same direction as the
   * given ``vec``, but with the given ``magnitude``.
   * @param {!Vector} vec
   * @param {number} magnitude
   * @return {!Vector}
   */
  static fromVector(vec, magnitude) {
    return vec.normalize().scale(magnitude);
  }

  /**
   * Return true if this and other are the same vector.
   * Takes PRECISION into account due to floating point rounding errors.
   * @param {!Vector} other
   * @return {boolean}
   */
  equals(other) {
    return Math.abs(this.x - other.x) <= PRECISION
        && Math.abs(this.y - other.y) <= PRECISION;
  }

  /**
   * Return whether this vector represents the zero vector.
   * @return {boolean}
   */
  isZero() {
    return this.equals(ZERO);
  }

  /**
   * Clone this vector.
   * @return {!Vector}
   */
  clone() {
    return new Vector(this.x, this.y);
  }

  /**
   * Multiply both components by scalar.
   * @param {number} scalar
   * @return {!Vector}
   */
  scale(scalar) {
    return new Vector(this.x * scalar, this.y * scalar);
  }

  /**
   * Add two vectors together.
   * @param {!Vector} vector
   * @return {!Vector}
   */
  add(vector) {
    const { x, y } = vector;
    return new Vector(this.x + x, this.y + y);
  }

  /**
   * Get the distance between this vector and another vector.
   * @param {!Vector} other
   * @return {number}
   */
  distance(other) {
    return Math.sqrt(
        Math.pow(this.x - other.x, 2) +
        Math.pow(this.y - other.y, 2));
  }

  /**
   * Get the magnitude of this vector.
   * @return {number} The magnitude of the vector.
   */
  magnitude() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  /**
   * Get the angle in radians of this vector.
   * @return {number}
   */
  angle() {
    return Math.atan2(this.y, this.x);
  }

  /**
   * Get the angle in degrees of this vector.
   * @return {number}
   */
  angleDeg() {
    return this.angle() * 180 / Math.PI;
  }

  /**
   * Returns a vector of magnitude 1, pointing in the original direction.
   * @return {!Vector}
   */
  normalize() {
    return this.scale(1/this.magnitude());
  }

  /**
   * @param {...!Vector} others A series of vectors to average.
   * @return {!Vector} A vector that is the average of this and other.
   */
  average(...others) {
    let ave = this;
    for (let vec of others) {
      ave = ave.add(vec);
    }
    return ave.scale(1/(others.length + 1));
  }

  /**
   * Rotate a vector by radians.
   * @param {number} radians The angle to rotate, in radians.
   * @return {!Vector} The new rotated vector.
   */
  rotate(radians) {
    const newX = this.x * Math.cos(radians) - this.y * Math.sin(radians);
    const newY = this.x * Math.sin(radians) + this.y * Math.cos(radians);
    return new Vector(newX, newY);
  }

  /**
   * Rotate the vector, using degrees.
   * @param {number} degrees
   * @return {!Vector}
   */
  rotateDeg(degrees) {
    const rads = degrees * Math.PI / 180;
    return this.rotate(rads);
  }

  /**
   * Clamp a vector to have  a magnitude of at least ``min``
   * and at most ``max``. Zero vectors are unchanged, as there is no
   * information to determine direction.
   * @param {number} max The largest magnitude this vector should have.
   * @param {number|undefined} min The smallest magnitude this vector should have.
   * @return {!Vector} The clamped vector.
   */
  clamp(max, min = 0) {
    if (this.isZero()) {
      return this;
    }
    const magnitude = Math.max(min, Math.min(max, this.magnitude()));
    return this.normalize().scale(magnitude);
  }

  /**
   * @return {string}
   */
  toString() {
    return `(${this.x.toFixed(6)}, ${this.y.toFixed(6)})`;
  }
}

// This has to be defined after Vector for some reason.
/** @const {!Vector} */
const ZERO = new Vector(0, 0);
