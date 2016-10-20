import { Component, Input, OnInit } from '@angular/core';

import { Event } from '../../../../core/app-state/models/event.model';

@Component({
  selector: 'ttd-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  private model: Event;

  @Input() event: Event;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.model = Object.assign({}, this.event);
  }

  onSubmit() {

  }
}
