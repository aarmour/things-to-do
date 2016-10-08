import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ApiHttpService } from '../api-http.service';
import { Event } from './event.model';

@Injectable()
export class EventsApiService {

  constructor(private http: ApiHttpService) {}

  fetch(id: string): Observable<any> {
    return this.http.get(`http://localhost:3000/events/${id}`)
      .map((response: Response) => response.json());
  }

  create(event: Event) {

  }

  save(event: Event) {

  }

  delete(id: string) {

  }

  // private extractData(response: Response): Event {
  //
  // }

}
