import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ttd-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  private iconHref: string;

  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.iconHref = `assets/icon-defs.svg#icon-${this.name}`;
  }

}
