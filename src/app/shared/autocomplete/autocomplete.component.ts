import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

const noop = () => {};

export const AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutocompleteComponent),
    multi: true
};

@Component({
  moduleId: module.id,
  selector: 'ttd-autocomplete',
  templateUrl: 'autocomplete.component.html',
  styleUrls: ['autocomplete.component.css'],
  providers: [AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteComponent implements ControlValueAccessor, OnInit {

  private searchValue: string = '';
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  @Input() items: Observable<any>;
  @Input() disabled: boolean;
  @Input() placeholder: string = '';
  @Output() searchTextChange: EventEmitter<any> = new EventEmitter();
  @Output() selectedItemChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
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

  writeValue(value: any) {
    if (value !== this.searchValue) {
      this.searchValue = value;
    }
  }

  registerOnChange(callback: any) {
    this.onChangeCallback = callback;
  }

  registerOnTouched(callback: any) {
    this.onTouchedCallback = callback;
  }

}
