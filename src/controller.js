import View from './view';
import Star from './star';
import State from './state';
import Vector from './vector';
import { Variables } from './variables';
import Debug from './debug';
import { getTime, getColor, getRandomVector, getRandomInt } from './utils';
import { LOG, log } from './logging';

/** @const {number} */
const KEY_SPACE = 32;
/** @const {number} */
const KEY_F = 102;

// 60 fps
const TIMESTEP = 1000 / 60;

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
    /** @private {!Vector} */
    this.previousDrawPosition = this.drawPosition;
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

    const cursorVelocity = this.calculateCursorVelocity(diff);
    this.previousDrawPosition = this.drawPosition;

    LOG && log('cursor velocity: %s', cursorVelocity.toString());
    Debug.getInstance().set('CURSOR_VELOCITY', cursorVelocity.toString());

    // Simulate the total elapsed time in fixed-size chunks
    while (this.delta >= TIMESTEP) {
      this.state.tick(TIMESTEP, this.view.bounds);
      this.delta -= TIMESTEP;
    }

    while (this.starTimer >= Variables['SPAWN_INTERVAL']) {
      if (this.state.hasRoom()) {
        const star = this.createStar(this.drawPosition, cursorVelocity);
        this.state.addStar(star);
        LOG && log('%c added star %s', `color: ${star.color}`, star);
      } else {
        LOG && log('at max star count of %d', Variables['MAX_STAR_COUNT']);
      }
      this.starTimer -= Variables['SPAWN_INTERVAL'];
    }

    this.view.render();
  }

  /**
   * Completely fill state with random stars, causing a firework effect.
   */
  fillStars() {
    let starsAdded = 0;
    while (this.state.hasRoom()) {
      this.state.addStar(this.createStar(this.drawPosition));
      ++starsAdded;
    }
    LOG && log('added %d stars', starsAdded);
  }

  /**
   * Start the render cycle.
   */
  start() {
    if (this.running) {
      return;
    }
    this.running = true;
    Debug.getInstance().set('RUNNING', this.running);
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
    Debug.getInstance().set('RUNNING', this.running);
  }

  toggle() {
    if (this.running) {
      this.stop();
    } else {
      this.start();
    }
  }

  /**
   * Calculate the velocity of the cursor based on its last position.
   * @param {number} delta The time passed since last calling this.
   * @return {!Vector} The velocity of the cursor.
   */
  calculateCursorVelocity(delta) {
    const distance = this.drawPosition.add(this.previousDrawPosition.scale(-1));
    return distance.scale(1/delta);
  }

  /**
   * @param {!Vector} position The point at which to initialze the star.
   * @param {Vector=} velocity The velocity bias to start the star with.
   * @return {!Star} A randomly created star.
   */
  createStar(position, velocity) {
      const color = getColor();
      let acceleration = getRandomVector();
      if (velocity && !velocity.isZero()) {
        // if we were given a velocity, limit the acceleration to the same
        // general direction as the velocity.
        const angle = getRandomInt(180) - 90;
        acceleration = velocity.normalize()
                              .rotate(angle)
                              .scale(acceleration.magnitude());
      }
      return new Star(position, acceleration, color, velocity);
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
      LOG && log('got keypress %d', e.keyCode);
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
