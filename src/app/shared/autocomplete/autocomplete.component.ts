import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { KeyCode } from '../../core';

const noop = () => {};

export const AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutocompleteComponent),
    multi: true
};

@Component({
  selector: 'ttd-autocomplete',
  templateUrl: 'autocomplete.component.html',
  styleUrls: ['autocomplete.component.scss'],
  providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteComponent implements ControlValueAccessor, OnDestroy, OnInit {

  private focusedItem: number = -1;
  private itemsArray = [];
  private itemCount = 0;
  private itemsSub: any;
  private previousSearchValue: string = '';
  private searchValue: string = '';

  // Placeholders for the callback functions that get set by
  // `registerOnChanged` and `registerOnTouch`, which are defined
  // on the `ControlValueAccessor` interface.
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  @Input() items: Observable<any[]>;
  @Input() disabled: boolean;
  @Input() placeholder: string = '';
  @Output() searchTextChange: EventEmitter<any> = new EventEmitter();
  @Output() selectedItemChange: EventEmitter<any> = new EventEmitter();

  @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    if (!this.items) throw new Error(`The 'items' input is required!`);

    this.itemsSub = this.items.subscribe(items => {
      this.itemsArray = items;
      this.itemCount = items.length
      this.clearFocusedItem();
      this.changeDetector.markForCheck();
    });
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }

  get value(): any {
    return this.searchValue;
  };

  set value(v: any) {
    if (v !== this.searchValue) {
      this.searchValue = v;
      this.onChangeCallback(v);
    }
  }

  onBlur() {
    this.onTouchedCallback();
  }

  onKeyup(keyCode) {
    switch(keyCode) {
      case KeyCode.ArrowUp:
        return this.focusPreviousItem();
      case KeyCode.ArrowDown:
        return this.focusNextItem();
      case KeyCode.Esc:
        return console.log('esc');
      case KeyCode.Enter:
        return this.selectItem();
      default:
        break;
    }
  }

  registerOnChange(callback: any) {
    this.onChangeCallback = callback;
  }

  registerOnTouched(callback: any) {
    this.onTouchedCallback = callback;
  }

  writeValue(value: any) {
    if (value !== this.searchValue) {
      this.searchValue = value;
    }
  }

  private clearFocusedItem() {
    this.focusItem(-1);
  }

  private focusItem(index) {
    this.focusedItem = index;
  }

  private focusLastItem() {
    this.focusItem(this.itemCount - 1);
  }

  private focusNextItem() {
    const nextItem = this.focusedItem + 1;
    if (nextItem < this.itemCount) this.focusItem(nextItem);
    else this.clearFocusedItem();
  }

  private focusPreviousItem() {
    const prevItem = this.focusedItem - 1;
    if (prevItem < -1) this.focusLastItem();
    else this.focusItem(prevItem);
  }

  private isItemFocused() {
    return this.focusedItem !== -1;
  }

  private selectItem() {
    if (!this.isItemFocused()) return;
    const item = this.itemsArray[this.focusedItem];
    this.searchValue = item;
    this.selectedItemChange.emit(item);
  }

}
