import Star from './star';
import View from './view';
import Vector from './vector';
import { Variables } from './variables';

/**
 * @return {!Star} A randomly created star.
 */
export function createStar(position) {
    const acceleration = getRandomVector();
    const color = getColor();
    return new Star(position, acceleration, color);
}

/**
 * @param {!View} view The view to get the screen dimensions.
 * @return {!Vector} A random position on the screen.
 */
export function getRandomScreenPosition(view) {
  const { width, height } = view;
  return new Vector(
      Math.floor(Math.random() * width),
      Math.floor(Math.random() * height));
}

/**
 * Get the color to use for new stars. Based on STAR_COLOR,
 * it will be a random color if STAR_COLOR is "random".
 * @return {string} Hex color.
 */
export function getColor() {
  return (Variables.STAR_COLOR === 'random')
        ? getRandomColor() : Variables.STAR_COLOR;
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
  const { MAX_ACCELERATION } = Variables;
  const vector = new Vector(
      (Math.random() * MAX_ACCELERATION * 2) - MAX_ACCELERATION,
      (Math.random() * MAX_ACCELERATION * 2) - MAX_ACCELERATION);

  return vector.clamp(MAX_ACCELERATION).floor();
}
