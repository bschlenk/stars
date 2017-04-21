/**
 * Wrapper around parse int to clean up logic below.
 * @param {string} i
 * @return {number}
 */
function int(i) {
  return parseInt(i, 10);
}

/**
 * Represents a normalized color. Provides methods for converting
 * hex, rgb, and rgba strings to the same format. This structure
 * is immutable.
 */
export default class Color {
  /**
   * @param {number} r The red value.
   * @param {number} g The green value.
   * @param {number} b The blue value.
   * @param {number=} a The alpha value, or 1 if not given.
   */
  constructor(r, g, b, a = 1.0) {
    /** @const {number} */ this.r = r;
    /** @const {number} */ this.g = g;
    /** @const {number} */ this.b = b;
    /** @const {number} */ this.a = a;
  }

  /**
   * Return a color from the given string, or null if the string
   * does not represent a valid color.
   * Works with hex, rgb, and rgba colors.
   * @param {string} str The string to convert.
   * @return {Color|null}
   */
  static fromString(str) {
    if (str.startsWith('#')) {
      return this.fromHexString(str);
    }
    if (str.startsWith('rgb(')) {
      return this.fromRGBString(str);
    }
    if (str.startsWith('rgba(')) {
      return this.fromRGBAString(str);
    }
    return null;
  }

  /**
   * @param {string} str
   * @return {Color|null}
   */
  static fromHexString(str) {
    const h = "0123456789ABCDEF";
    str = str.toUpperCase();
    if (str.length === 4) {
      let c = str.split('');
      c = [c[0], c[1], c[1], c[2], c[2], c[3], c[3]];
      str = c.join('');
    }
    const r = h.indexOf(str[1])*16+h.indexOf(str[2]);
    const g = h.indexOf(str[3])*16+h.indexOf(str[4]);
    const b = h.indexOf(str[5])*16+h.indexOf(str[6]);

    return new Color(r, g, b);
  }

  /**
   * @param {string} str
   * @return {Color|null}
   */
  static fromRGBString(str) {
    const match = /rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\)/.exec(str);
    if (!match) {
      return null;
    }
    const [, r, g, b] = match;
    return new Color(int(r), int(g), int(b));
  }

  /**
   * @param {string} str
   * @return {Color|null}
   */
  static fromRGBAString(str) {
    const match = /rgba\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+(?:\.\d+)?)\)/.exec(str);
    if (!match) {
      return null;
    }
    const [, r, g, b, a] = match;
    return new Color(int(r), int(g), int(b), parseFloat(a));
  }

  /**
   * Return the rgba color string.
   * @return {string}
   */
  toString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  /**
   * @param {number} val The new opacity value.
   * @return {!Color}
   */
  opacity(val) {
    return new Color(this.r, this.g, this.b, val);
  }
}
