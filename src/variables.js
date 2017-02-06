/**
 * @enum {string}
 */
export const Shape = {
  SQUARE: 'square',
  CIRCLE: 'circle',
  RANDOM: 'random',
};

/**
 * All possible variables.
 * NOTE: these are all quoted so they keep their names after compilation.
 * @type {!Object}
 */
export const Variables = {
  'STAR_COLOR'          : 'random',
  'STAR_SHAPE'          : Shape.SQUARE,
  'BACKGROUND_COLOR'    : '#000',
  'MAX_ACCELERATION'    : 800,
  'MIN_ACCELERATION'    : 600,
  'MAX_VELOCITY'        : 1000,
  'SPAWN_INTERVAL'      : 100,
  'STAR_SIZE'           : 1,
  'EXPANSION_RATE'      : 10,
  'TOGGLE_ON_FOCUS_BLUR': true,
}

export class VariableDisplay {

  /**
   * Sets up the variables table with the variables
   * defined above.
   * @param {Element=} element The element to use, or none.
   * @param {Element=} parent The element to place the debug window within.
   */
  constructor(element, parent) {
    this.element = element || document.createElement('div');
    this.element.style.display = 'none';
    this.element.style.position = 'fixed';
    this.element.style.top = '10px';
    this.element.style.left = '10px';
    this.element.style.opacity = '0.8';
    this.element.style.zIndex = '10';
    this.element.style.backgroundColor = '#CCC';

    parent = parent || document.body;
    parent.appendChild(this.element);

    const table = document.createElement('table');
    this.element.appendChild(table);
    const button = document.createElement('button');
    this.element.appendChild(button);
    button.innerHTML = 'Close';
    button.onclick = e => {
      this.hide();
    };

    for (const [key, value] of Object.entries(Variables)) {
      var row = document.createElement('tr');
      var labelCol = document.createElement('td');
      labelCol.style.textAlign = 'right';
      var inputCol = document.createElement('td');
      inputCol.style.textAlign = 'left';
      var label = document.createElement('label');
      label.innerHTML = key;
      labelCol.appendChild(label);
      var input = document.createElement('input');
      input.onchange = (key => {
        return e => {
          const value = e.currentTarget.value;
          console.log('%s changed to %s', key, value)
          Variables[key] = value;
        };
      })(key);
      input.setAttribute('type', 'text');
      input.value = value;
      inputCol.appendChild(input);
      row.appendChild(labelCol);
      row.appendChild(inputCol);
      table.appendChild(row);
    }
  }

  show() {
    this.element.style.display = 'unset';
  }

  hide() {
    this.element.style.display = 'none';
  }
}
