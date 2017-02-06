import { Variables, Shape } from './variables';
import State from './state';
import Vector from './vector';
import Box from './box';

/**
 * Encapsulates the canvas and context.
 */
export default class View {

  /**
   * @param {State} state
   * @param {Element=} parent
   */
  constructor(state, parent) {
    /** @private */ this.state = state;
    /** @type {!Element} */ this.canvas = document.createElement('canvas');
    /** @type {!Object} */ this.ctx = this.canvas.getContext('2d');
    /** @type {number} */ this.width = window.innerWidth;
    /** @type {number} */ this.height = window.innerHeight;
    /** @type {!Box} */ this.bounds = this.createBounds();

    this.canvas.style.zIndex = -1;
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';

    parent = parent || document.body;
    parent.appendChild(this.canvas);

    this.installBindings();

    // ensure width and height are set from the beginning
    this.resizeView();
  }

  /**
   * Check if the point is contained within the view.
   * @param {!Vector} point
   * @returns {boolean}
   */
  contains(point) {
    return this.bounds.contains(point);
  }

  /**
   * @param {!Vector} start
   * @param {!Vector} end
   */
  drawLine(start, end) {
    this.ctx.beginPath();
    this.ctx.moveTo(start.x, start.y);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.stroke();
  }

  /**
   * Clear the canvas by drawing the background color.
   */
  clear() {
    this.ctx.fillStyle = Variables['BACKGROUND_COLOR'];
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  /**
   * Update the view with the current window size.
   */
  resizeView() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.bounds = this.createBounds();
    this.render();
  }

  /**
   * @param {{pos:!Vector, color:string, size:number}} drawable
   */
  drawSquare(drawable) {
    const { pos, color, size } = drawable;
    const { x, y } = pos;
    const halfSize = size / 2;
    this.ctx.fillStyle = color;
    // center the square around the position
    this.ctx.fillRect(x - halfSize, y - halfSize, size, size);
  }

  /**
   * @param {{pos:!Vector, color:string, size:number}} drawable
   */
  drawCircle(drawable) {
    const { pos, color, size } = drawable;
    const { x, y } = pos;
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, size / 2, 0, 2 * Math.PI, false);
    this.ctx.fill();
  }

  /**
   * @param {{pos:!Vector, color:string, size:number, shape:!Shape}} drawable
   */
  draw(drawable) {
    switch (drawable.shape) {
      case Shape.SQUARE:
        this.drawSquare(drawable);
        break;
      case Shape.CIRCLE:
        this.drawCircle(drawable);
        break;
      default:
        console.error('%s is not a valid shape', drawable.shape);
    }
  }

  render() {
    this.clear();
    this.state.getStars().forEach(star => this.draw(star));
  }

  /**
   * @private
   * @returns {!Box} The bounds of the view.
   */
  createBounds() {
    return new Box(Vector.zero(), new Vector(this.width, this.height));
  }

  /**
   * Set up event listeners for resizing.
   */
  installBindings() {
    window.addEventListener('resize', this.resizeView.bind(this), false);
    window.addEventListener('orientationchange', this.resizeView.bind(this), false);
  }
}
