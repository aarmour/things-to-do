"use strict";

// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  '@ngrx': 'vendor/@ngrx',
  'angular2-jwt': 'vendor/angular2-jwt/angular2-jwt.js'
};

/** User packages configuration. */
const packages: any = {
  '@ngrx/core': {
    main: 'index.js',
    format: 'cjs'
  },
  '@ngrx/store': {
    main: 'index.js',
    format: 'cjs'
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/forms',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/+settings',
  'app/+settings/profile',
  'app/+styleguide',
  'app/+styleguide/components',
  'app/core',
  'app/dashboard',
  'app/dashboard/events',
  'app/dashboard/events/event-create',
  'app/dashboard/events/event-detail',
  'app/dashboard/events/event-list',
  'app/dashboard/events/event-search',
  'app/dashboard/search',
  'app/dashboard/shared',
  'app/dashboard/shared/toolbar',
  'app/shared',
  'app/shared/mapbox',
  'app/shared/mapbox/map',
  'app/shared/autocomplete',
  'app/shared/mapbox/geocoder',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
