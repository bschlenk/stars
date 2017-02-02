import View from './view';
import State from './state';
import Vector from './vector';
import { Variables } from './variables';
import { createStar } from './utils';

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
      const star = createStar(this.drawPosition);
      this.state.addStar(star);
      // console.log('%c added star %s', `color: ${star.color}`, star);
      this.starTimer -= Variables['SPAWN_INTERVAL'];
    }

    this.view.render();
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
      if (e.keyCode === 32) {
        this.toggle();
      }
    });

    window.addEventListener('focus', e => {
      this.start();
    });

    window.addEventListener('blur', e => {
      this.stop();
    });
  }
}
