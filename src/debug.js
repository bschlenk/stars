
let instance;

export default class Debug {
  /**
   * @private
   */
  constructor() {
    /** @private {!Element} */
    this.debugTable =
        /** @type {!Element} */ (document.getElementById('debug'));

    /** @private {!Object} */
    this.variables = {};
  }

  static getInstance() {
    if (instance === undefined) {
      instance = new Debug();
    }
    return instance;
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
    if (key in this.variables) {
      const obj = this.variables[key];
      obj.display.innerHTML = value;
    } else {
      this.newVariable(key, value);
    }
  }

  /**
   * @param {string} key
   * @param {*} value
   */
  newVariable(key, value) {
    var row = document.createElement('tr');
    var labelCol = document.createElement('td');
    var displayCol = document.createElement('td');
    var label = document.createElement('label');
    label.innerHTML = key;
    labelCol.appendChild(label);
    var display = document.createElement('span');
    display.innerHTML = value;
    displayCol.appendChild(display);
    row.appendChild(labelCol);
    row.appendChild(displayCol);
    this.debugTable.appendChild(row);

    const toStore = { value, label, display };
    this.variables[key] = toStore;

    return toStore;
  }
}
