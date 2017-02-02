import View from './view';
import State from './state';
import Controller from './controller';
import Konami from './konami';
import { VariableDisplay } from './variables';

const state = new State();
const view = new View(state);
const controller = new Controller(view, state);
const variableDisplay = new VariableDisplay();
const konami = new Konami(() => {
  variableDisplay.show();
});

controller.start();
