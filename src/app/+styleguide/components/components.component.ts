import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const FRUITS = [
  'Apple',
  'Banana',
  'Canteloupe',
  'Grape',
  'Kiwi',
  'Orange',
  'Pear',
  'Pineapple',
  'Watermelon'
];

@Component({
  moduleId: module.id,
  selector: 'ttd-components',
  templateUrl: 'components.component.html',
  styleUrls: ['components.component.css']
})
export class ComponentsComponent implements OnInit {

  private autoCompleteSearchValue: string = '';
  private autoCompleteItems = new BehaviorSubject<string[]>(FRUITS);

  constructor() {
  }

  ngOnInit() {
  }

  onSearchValueChange(newValue) {
    this.autoCompleteSearchValue = newValue;
    this.autoCompleteItems.next(this.searchFruits(newValue));
  }

  private searchFruits(query) {
    if (!query) return FRUITS;
    return FRUITS.filter(fruit => fruit.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

}
