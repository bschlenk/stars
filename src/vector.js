/**
 * Represents a vector from the origin.
 * Used both as a point and a vector throughout.
 */
export default class Vector {
  /**
   * @param {number} x
   * @param {number} y
   * @return {!Vector}
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * @return {!Vector}
   */
  static zero() {
    return new Vector(0, 0);
  }

  /**
   * Return a vector with identical x, y values.
   * @return {!Vector}
   */
  static square(val) {
    return new Vector(val, val);
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
    return `(${this.x}, ${this.y})`;
  }
}
