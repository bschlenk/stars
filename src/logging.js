
/** @const {boolean} */
export const LOG = true;

/**
 * @param {string} message
 * @param {...*} args
 */
export function log(message, ...args) {
  console.log(message, ...args);
}
