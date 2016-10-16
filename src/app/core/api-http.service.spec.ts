/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ApiHttpService } from './api-http.service';

describe('Service: ApiHttp', () => {
  beforeEach(() => {
    addProviders([ApiHttpService]);
  });

  it('should ...',
    inject([ApiHttpService],
      (service: ApiHttpService) => {
        expect(service).toBeTruthy();
      }));
});
