import View from './view';
import State from './state';
import Controller from './controller';
import Konami from './konami';
import { Variables, VariableDisplay } from './variables';
import Debug from './debug';

/** @export */
export default class Stars {
  /**
   * @param {Object=} options Options get placed in the variables object.
   */
  constructor(options) {
    options = options || {};
    this.state = new State();
    this.view = new View(this.state);
    this.controller = new Controller(this.view, this.state);
    this.variableDisplay = new VariableDisplay();
    Debug.appendTo(this.variableDisplay.element);
    this.konami = new Konami(() => {
      this.variableDisplay.show();
    });

    Object.assign(Variables, options);
  }

  start() {
    this.controller.start();
  }
}

window['Stars'] = Stars;
