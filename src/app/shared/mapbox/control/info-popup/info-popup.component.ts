import {
  Component,
  ViewChild,
  ElementRef,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { ControlComponent } from '../control.component';
import { InfoPopup } from './info-popup.control';

@Component({
  selector: 'mb-info-popup',
  templateUrl: 'info-popup.component.html',
  styleUrls: ['info-popup.component.scss']
})
export class InfoPopupComponent extends ControlComponent {

  private contentObserver: any;
  private infoPopup: any;

  @Input() open: boolean = true;
  @Input() position: string = 'bottom-left';
  @Output() close: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('content') content: ElementRef;

  constructor() {
    super();
  }

  ngOnChanges() {
    if (!this.infoPopup) return;
    this.infoPopup[this.open ? 'open' : 'close']();
  }

  ngAfterViewInit() {
    const observer = this.contentObserver = new MutationObserver((mutations) => this.setContent());
    observer.observe(this.content.nativeElement.children[0], { childList: true, characterData: true, subtree: true });
  }

  afterSetMap() {
    if (!this.map) return;

    const infoPopup = this.infoPopup = new InfoPopup({ open: this.open, position: this.position });

    infoPopup.on('close', () => {
      if (this.open) {
        this.close.next({});
      }
    });

    this.map.addControl(infoPopup);
    this.setContent();
  }

  setContent() {
    if (!this.content) return;
    if (!this.infoPopup) return;

    this.infoPopup.html(this.content.nativeElement.children[0].innerHTML);
  }

}
