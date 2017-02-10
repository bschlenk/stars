import Vector from './vector';
import { Variables } from './variables';

/**
 * Returns the current time millis in the most accurate way possible.
 * @return {number}
 */
export const getTime = (() => {
  if (window.performance && window.performance.now) {
    return () => window.performance.now();
  }
  return () => new Date().getTime();
})();

/**
 * Get the color to use for new stars. Based on STAR_COLOR,
 * it will be a random color if STAR_COLOR is "random".
 * @return {string} Hex color.
 */
export function getColor() {
  return (Variables['STAR_COLOR'] === 'random')
        ? getRandomColor() : Variables['STAR_COLOR'];
}

/**
 * Generate a random number between 0 and max.
 * @param {number} max The max value of the int to generate.
 * @return {number} The randomly generated number.
 */
export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/**
 * @return {string} Random rgba color.
 */
export function getRandomColor() {
  const r = getRandomInt(256);
  const g = getRandomInt(256);
  const b = getRandomInt(256);
  return `rgba(${r}, ${g}, ${b}, ${Variables['STAR_OPACITY']})`;
}

/**
 * @param {Vector=} bias A direction to bias the generated vector.
 * @return {!Vector}
 */
export function getRandomVector(bias) {
  const acc = Variables['MAX_ACCELERATION'];
  let vector = new Vector(
      (Math.random() * acc * 2) - acc,
      (Math.random() * acc * 2) - acc);

  if (bias) {
    vector = vector.add(bias)
  }
  return vector.clamp(acc)
}
