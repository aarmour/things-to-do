import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Event } from '../../../core/app-state/models/event.model';

@Component({
  selector: 'ttd-event-create',
  templateUrl: 'event-create.component.html',
  styleUrls: ['event-create.component.scss']
})
export class EventCreateComponent implements OnDestroy, OnInit {

  private event: Event;

  // Subscriptions
  private paramsSub: Subscription;

  constructor(private route: ActivatedRoute) {
    this.paramsSub = this.route.params.subscribe((params: any) => {
      this.event = {
        placeName: params.place,
        longitude: params.x,
        latitude: params.y
      } as Event;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

}
