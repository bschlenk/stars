import Star from './star';
import View from './view';
import Vector from './vector';
import { Variables } from './variables';

/**
 */

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
 * @return {string} Random hex color.
 */
export function getRandomColor() {
  const letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * @return {!Vector}
 */
export function getRandomVector() {
  const acc = Variables['MAX_ACCELERATION'];
  const vector = new Vector(
      (Math.random() * acc * 2) - acc,
      (Math.random() * acc * 2) - acc);

  return vector.clamp(acc).floor();
}
