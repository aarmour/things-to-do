import { createButton, createElement } from '../../util/dom';

declare const mapboxgl: any;

const Control = mapboxgl.Control;
const util = mapboxgl.util;

/**
 * A `User` control provides a login button for an unauthenticated user.
 * For an authenticated user, the `User` control renders the user's
 * profile image and when clicked opens a menu containing user-related
 * actions.
 * Extends [`Control`](#Control)
 *
 * @class User
 */
export function User(options?: Object) {
  options = Object.assign({}, options, { position: 'top-right' });
  util.setOptions(this, options);
}

User.prototype = util.inherit(Control, {
  options: {
    userProfile: undefined
  },

  onAdd: function(map) {
    const className = 'mapboxgl-ctrl';

    const container = this._container = createElement('div', className + '-group ' + className + '-user', map.getContainer());

    const button = this._button = createButton('', container, this._onClick.bind(this));
    this.setUserProfile(this.options.userProfile);

    return container;
  },

  setUserProfile: function(userProfile) {
    this.userProfile = userProfile;

    if (userProfile) {
      this._button.textContent = 'Sign Out';
    } else {
      this._button.textContent = 'Log In';
    }
  },

  _onClick: function(evt) {
    this.fire(this.userProfile ? 'logout' : 'login');
  }
});
