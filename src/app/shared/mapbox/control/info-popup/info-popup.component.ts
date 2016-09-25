import {
  Component,
  Input
} from '@angular/core';

import { ControlComponent } from '../control.component';
import { InfoPopup } from './info-popup.control';

@Component({
  moduleId: module.id,
  selector: 'mb-info-popup',
  templateUrl: 'info-popup.component.html',
  styleUrls: ['info-popup.component.css']
})
export class InfoPopupComponent extends ControlComponent {

  @Input() position: string = 'bottom-left';

  constructor() {
    super();
  }

  afterSetMap() {
    if (!this.map) return;
    const infoPopup = new InfoPopup({ position: this.position });
    this.map.addControl(infoPopup);
  }

}
