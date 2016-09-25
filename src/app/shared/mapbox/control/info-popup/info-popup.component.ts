import {
  Component,
  ViewChild,
  ElementRef,
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

  private contentObserver: any;
  private infoPopup: any;

  @Input() position: string = 'bottom-left';

  @ViewChild('content') content: ElementRef;

  constructor() {
    super();
  }

  ngAfterViewInit() {
    const observer = this.contentObserver = new MutationObserver((mutations) => this.setContent());
    observer.observe(this.content.nativeElement.children[0], { childList: true, characterData: true, subtree: true });
  }

  afterSetMap() {
    if (!this.map) return;

    const infoPopup = this.infoPopup = new InfoPopup({ position: this.position });

    this.map.addControl(infoPopup);
    this.setContent();
  }

  setContent() {
    if (!this.content) return;
    if (!this.infoPopup) return;

    this.infoPopup.html(this.content.nativeElement.children[0].innerHTML);
  }

}
