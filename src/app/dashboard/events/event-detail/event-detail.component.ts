import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Event } from '../../../core/app-state/models/event.model';
import {
  FetchEventAction,
  SelectEventAction,
  SetMapCenterAction,
  State,
  getSelectedEvent,
  getSelectedEventMetadata
} from '../../../core';

@Component({
  selector: 'ttd-event-detail',
  templateUrl: 'event-detail.component.html',
  styleUrls: ['event-detail.component.scss']
})
export class EventDetailComponent implements OnDestroy, OnInit {

  private event: Observable<Event>;
  private isLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  // Subscriptions
  private actionsSubscription: Subscription;
  private eventSubscription: Subscription;
  private eventMetadataSubscription: Subscription;

  constructor(private store: Store<State>, route: ActivatedRoute) {
    this.subscriptions.push(route.params
      .select<string>('id')
      .map(id => new SelectEventAction(id))
      .subscribe(store));

    this.subscriptions.push(store.let(getSelectedEventMetadata)
      .subscribe(state => {
        this.isLoading = state.isLoading;
      }));

    this.event = store.let(getSelectedEvent);

    this.subscriptions.push(this.event
      .subscribe(event => {
        if (!event) return;
        this.store.dispatch(new SetMapCenterAction({
          lng: event.centerGeometry.coordinates[0],
          lat: event.centerGeometry.coordinates[1]
        } as mapboxgl.LngLat));
      })
    );
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
