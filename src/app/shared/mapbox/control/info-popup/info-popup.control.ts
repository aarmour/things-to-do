import { createElement } from '../../util/dom';

declare const mapboxgl: any;

const Control = mapboxgl.Control;
const util = mapboxgl.util;

/**
 * An `InfoPopup` control is a container for summary information about a
 * selected feature.
 * Extends [`Control`](#Control).
 *
 * @class InfoPopup
 * @param {Object} [options]
 * @param {string} [options.position='bottom'] A string indicating the control's position on the map.
 *   Options are `'top-right'`, `'top-left'`, `'bottom-right'`, and `'bottom-left'`.
 */
export function InfoPopup(options) {
  util.setOptions(this, options);
}

InfoPopup.prototype = util.inherit(Control, {
  options: {
    position: 'bottom-left'
  },

  onAdd: function(map) {
    const className = 'mapboxgl-ctrl';

    const container = this._container = createElement('div', className + '-group', map.getContainer());

    container.innerHTML = '<p>FPO</p>';

    this._el = map.getCanvasContainer();

    return container;
  },

  /**
   * Sets the html content of the control.
   * @param  {string} html
   */
  html: function(html) {

  }
});
