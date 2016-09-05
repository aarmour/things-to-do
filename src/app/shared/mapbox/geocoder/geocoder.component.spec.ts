/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { GeocoderComponent } from './geocoder.component';

describe('Component: Geocoder', () => {
  it('should create an instance', () => {
    let component = new GeocoderComponent();
    expect(component).toBeTruthy();
  });
});
