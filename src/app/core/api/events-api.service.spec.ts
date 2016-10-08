/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventsApiService } from './events-api.service';

describe('Service: EventsApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsApiService]
    });
  });

  it('should ...', inject([EventsApiService], (service: EventsApiService) => {
    expect(service).toBeTruthy();
  }));
});
