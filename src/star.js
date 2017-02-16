import { Variables, Shape } from './variables';
import Vector from './vector';
import Box from './box';
import { getTime } from './utils';

let starId = 0;

/**
 * The reprentation of one star.
 */
export default class Star {
  /**
   * @param {!Vector} pos The starting position of the star.
   * @param {!Vector} acc The acceleration of the star.
   * @param {string} color The css color of the star.
   * @param {Vector=} vel The initial velocity, or zero if not specified.
   */
  constructor(pos, acc, color, vel) {
    this.color = color;
    this.pos = pos
    this.acc = acc;
    /** @type {!Vector} */ this.vel = vel || Vector.zero();
    /** @type {number} */ this.size = parseInt(Variables['STAR_SIZE'], 10);
    /** @type {number} */ this.id = starId++;
    /** @type {!Shape} */ this.shape = this.getShape();
    /** @type {number} */ this.creationTime = getTime();
    /** @type {number} */ this.age = 0;
    /** @type {boolean} */ this.living = true;
  }

  /**
   * @private
   * @return {!Shape}
   */
  getShape() {
    if (Variables['STAR_SHAPE'] === Shape.RANDOM) {
      const choices = Object.values(Shape).filter(val => val !== 'random');
      const choice = Math.floor(Math.random() * choices.length);
      return choices[choice];
    }
    return Variables['STAR_SHAPE'];
  }

  /**
   * @return {string}
   */
  toString() {
    return `<Star ${this.pos}>`;
  }

  /**
   * @return {!Box}
   */
  getBounds() {
    const halfSize = this.size / 2;
    const start = this.pos.add(Vector.of(-halfSize, -halfSize));
    const end = start.add(Vector.square(this.size));
    return new Box(start, end);
  }

  /**
   * Recalculate size and position based on the amount of time elapsed.
   * @param {number} elapsed
   */
  tick(elapsed) {
    this.vel = this.vel.add(this.acc.scale(elapsed)).clamp(Variables['MAX_VELOCITY'])
    this.pos = this.pos.add(this.vel.scale(elapsed))
    this.size += elapsed * Variables['EXPANSION_RATE'];
    this.age += elapsed;
  }
}
