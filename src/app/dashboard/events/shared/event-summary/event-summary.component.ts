import { Component, Input, OnInit } from '@angular/core';

import { Event } from '../../../../core/app-state/models/event.model';

@Component({
  selector: 'ttd-event-summary',
  templateUrl: './event-summary.component.html',
  styleUrls: ['./event-summary.component.scss']
})
export class EventSummaryComponent implements OnInit {

  @Input() event: Event;

  constructor() { }

  ngOnInit() {
  }

}
