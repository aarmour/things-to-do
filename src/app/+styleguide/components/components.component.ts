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
  selector: 'ttd-components',
  templateUrl: 'components.component.html',
  styleUrls: ['components.component.scss']
})
export class ComponentsComponent implements OnInit {

  private autocompleteSearchValue: string = '';
  private autocompleteItems = new BehaviorSubject<string[]>(FRUITS);
  private autocompleteSelectedItem: string;

  constructor() {
  }

  ngOnInit() {
  }

  onSearchValueChange(newValue) {
    this.autocompleteSearchValue = newValue;
    this.autocompleteItems.next(this.searchFruits(newValue));
  }

  onAutocompleteSelectedItemChange(item) {
    this.autocompleteSelectedItem = item;
  }

  private searchFruits(query) {
    if (!query) return FRUITS;
    return FRUITS.filter(fruit => fruit.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

}
