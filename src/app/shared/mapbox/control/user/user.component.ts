import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';

import { ControlComponent } from '../control.component';
import { User } from './user.control';

@Component({
  selector: 'mb-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [{ provide: ControlComponent, useExisting: forwardRef(() => UserComponent) }],
})
export class UserComponent extends ControlComponent {

  private userControl: any;

  @Input() userProfile;
  @Output() login: EventEmitter<any> = new EventEmitter<any>();
  @Output() logout: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
  }

  ngOnChanges() {
    if (!this.userControl) return;

    this.userControl.setUserProfile(this.userProfile);
  }

  afterSetMap() {
    if (!this.map) return;

    const userControl = this.userControl = new User({
      userProfile: this.userProfile
    });

    userControl.on('login', () => this.login.emit());
    userControl.on('logout', () => this.logout.emit());

    this.map.addControl(userControl);
  }

}
