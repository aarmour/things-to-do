import { createButton, createElement } from '../../util/dom';

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
 * @param {Boolean} [options.open=true] Indicates whether the popup should be open initially.
 * @param {string} [options.position='bottom'] A string indicating the control's position on the map.
 *   Options are `'top-right'`, `'top-left'`, `'bottom-right'`, and `'bottom-left'`.
 */
export function InfoPopup(options) {
  util.setOptions(this, options);
}

InfoPopup.prototype = util.inherit(Control, {
  options: {
    open: true,
    position: 'bottom-left',
  },

  onAdd: function(map) {
    const className = 'mapboxgl-ctrl';

    const container = this._container = createElement('div', className + '-group ' + className + '-info-popup', map.getContainer());
    if (this.options.open) container.classList.add('expanded');

    const content = this._content = createElement('div', className + '-info-popup-content', container);

    this._closeButton = createButton(className + '-icon ' + className + '-close', container, this.close.bind(this));

    this._el = map.getCanvasContainer();

    return container;
  },

  close: function() {
    this._container.classList.remove('expanded');
    this.fire('close');
  },

  open: function() {
    this._container.classList.add('expanded');
  },

  /**
   * Sets the html content of the control.
   * @param  {string} html
   */
  html: function(html) {
    if (!this._content) throw new Error('The InfoPopup control must be added to the map before setting the content!');
    this._content.innerHTML = html;
  }
});
