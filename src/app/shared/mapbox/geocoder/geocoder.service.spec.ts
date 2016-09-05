/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { GeocoderService } from './geocoder.service';

describe('Service: Geocoder', () => {
  beforeEach(() => {
    addProviders([GeocoderService]);
  });

  it('should ...',
    inject([GeocoderService],
      (service: GeocoderService) => {
        expect(service).toBeTruthy();
      }));
});
