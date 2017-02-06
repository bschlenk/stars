/** @const {number} */
const PRECISION = 1e-6;

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
   * Return true if this and other are the same vector.
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
   * @return {!Vector}
   */
  clone() {
    return new Vector(this.x, this.y);
  }

  /**
   * Take the floor of both components of the vector.
   * @return {!Vector}
   */
  floor() {
    return new Vector(Math.floor(this.x), Math.floor(this.y));
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
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  /**
   * @param {!Vector} other
   * @return {number}
   */
  distance(other) {
    return Math.sqrt(
        Math.pow(this.x - other.x, 2) +
        Math.pow(this.y - other.y, 2));
  }

  /**
   * @return {number} The magnitude of the vector.
   */
  magnitude() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
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
   * @param {number} max The largest magnitude this vector should have.
   * @param {number|null} min The smallest magnitude this vector should have.
   * @return {!Vector} The clamped vector.
   */
  clamp(max, min = null) {
    const magnitude = this.magnitude();
    if (magnitude === 0) {
      return this.clone();
    }
    const amplifier = magnitude > max
        ? max : min !== null && magnitude < min
            ? min : magnitude;
    return this.scale(amplifier / magnitude);
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
