import { Variables, Shape } from './variables';
import Vector from './vector';
import Box from './box';

let starId = 0;

/**
 * The reprentation of one star.
 */
export default class Star {
  /**
   * @param {!Vector} pos The starting position of the star.
   * @param {!Vector} acc The acceleration of the star.
   * @param {string} color The css color of the star.
   */
  constructor(pos, acc, color) {
    this.color = color;
    this.pos = pos
    this.acc = acc;
    /** @type {!Vector} */ this.vel = Vector.zero();
    /** @type {number} */ this.size = Variables.STAR_SIZE;
    /** @type {number} */ this.id = starId++;
    /** @type {!Shape} */ this.shape = this.getShape();
  }

  /**
   * @private
   * @return {!Shape}
   */
  getShape() {
    if (Variables.STAR_SHAPE === Shape.RANDOM) {
      const choices = Object.values(Shape).filter(val => val !== 'random');
      const choice = Math.floor(Math.random() * choices.length);
      return choices[choice];
    }
    return Variables.STAR_SHAPE;
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
    const start = this.pos.add(Vector.square(-(this.size / 2)));
    const end = start.add(Vector.square(this.size));
    return new Box(start, end);
  }

  /**
   * Recalculate size and position based on the amount of time elapsed.
   * @param {number} elapsed
   */
  tick(elapsed) {
    this.vel = this.vel.add(this.acc.scale(elapsed)).clamp(Variables.MAX_VELOCITY)
    this.pos = this.pos.add(this.vel.scale(elapsed))
    this.size += elapsed * Variables.EXPANSION_RATE;
  }
}
