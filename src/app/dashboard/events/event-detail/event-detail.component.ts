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

  private actionsSubscription: Subscription;
  private eventMetadataSubscription: Subscription;
  private event: Observable<Event>;
  private isLoading: boolean = false;

  constructor(private store: Store<State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .select<string>('id')
      .map(id => new SelectEventAction(id))
      .subscribe(store);

    this.eventMetadataSubscription = store.let(getSelectedEventMetadata)
      .subscribe(state => {
        this.isLoading = state.isLoading;
      });

    this.event = store.let(getSelectedEvent);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }

}
