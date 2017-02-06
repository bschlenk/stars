import View from './view';
import Star from './star';
import State from './state';
import Vector from './vector';
import { Variables } from './variables';
import { getColor, getRandomVector } from './utils';

/** @const {number} */
const KEY_SPACE = 32;
/** @const {number} */
const KEY_F = 102;

// 60 fps
const TIMESTEP = 1000 / 60;
const getTime = (() => {
  if (window.performance && window.performance.now) {
    return () => window.performance.now();
  }
  return () => new Date().getTime();
})();

export default class Controller {
  /**
   * @param {!View} view
   * @param {!State} state
   */
  constructor(view, state) {
    this.view = view;
    this.state = state;
    // initialize the draw position to the center of the screen
    this.drawPosition = new Vector(view.width / 2, view.height / 2);

    /** @private {boolean} */
    this.running = false;
    /** @private {number} */
    this.lastTime = 0;
    /** @private {number} */
    this.delta = 0;
    /** @private {number} */
    this.starTimer = 0;

    this.installBindings();
  }

  /**
   * @param {!Vector} newPos
   */
  updateDrawPosition(newPos) {
    this.drawPosition = newPos;
  }

  handleTick(timestamp) {
    // track the accumulated time that hasn't been simulated yet
    const diff = timestamp - this.lastTime;
    this.delta += diff;
    this.starTimer += diff;
    this.lastTime = timestamp;

    // Simulate the total elapsed time in fixed-size chunks
    while (this.delta >= TIMESTEP) {
      this.state.tick(TIMESTEP, this.view.bounds);
      this.delta -= TIMESTEP;
    }

    while (this.starTimer >= Variables['SPAWN_INTERVAL']) {
      const star = this.createStar(this.drawPosition);
      this.state.addStar(star);
      // console.log('%c added star %s', `color: ${star.color}`, star);
      this.starTimer -= Variables['SPAWN_INTERVAL'];
    }

    this.view.render();
  }

  /**
   * Completely fill state with random stars, causing a firework effect.
   */
  fillStars() {
    while (this.state.hasRoom()) {
      this.state.addStar(this.createStar(this.drawPosition));
    }
  }

  /**
   * Start the render cycle.
   */
  start() {
    if (this.running) {
      return;
    }
    this.running = true;
    this.lastTime = getTime();
    const frame = (timestamp) => {
      this.handleTick(timestamp);
      if (this.running) {
        requestAnimationFrame(frame);
      }
    }
    requestAnimationFrame(frame);
  }

  /**
   * Stop the render cycle.
   */
  stop() {
    this.running = false;
  }

  toggle() {
    if (this.running) {
      this.stop();
    } else {
      this.start();
    }
  }

  /**
   * @param {!Vector} position The point at which to initialze the star.
   * @return {!Star} A randomly created star.
   */
  createStar(position) {
      const color = getColor();
      const acceleration = getRandomVector();
      return new Star(position, acceleration, color);
  }

  installBindings() {
    document.addEventListener('mousemove', e => {
      const x = e.clientX || e.pageX;
      const y = e.clientY || e.pageY;
      this.updateDrawPosition(new Vector(x, y));
    });

    // todo: rework this
    document.addEventListener("touchstart", e => {
      var touches = e.changedTouches;
      for (const touch of touches) {
        const x = touch.pageX;
        const y = touch.pageY;
        this.updateDrawPosition(new Vector(x, y));
      }
    });

    document.addEventListener('keypress', e => {
      switch (e.keyCode) {
        case KEY_SPACE: return this.toggle();
        case KEY_F: return this.fillStars();
      }
    });

    window.addEventListener('focus', e => {
      if (Variables['TOGGLE_ON_FOCUS_BLUR']) {
        this.start();
      }
    });

    window.addEventListener('blur', e => {
      if (Variables['TOGGLE_ON_FOCUS_BLUR']) {
        this.stop();
      }
    });
  }
}
