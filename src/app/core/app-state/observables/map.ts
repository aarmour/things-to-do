import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/scan';

import { dispatcher } from '../app-state.providers';
import {
  Action,
  SelectMapPointAction
} from '../actions';

@Injectable()
export class MapObservables {

  constructor(@Inject(dispatcher) private actions: Observable<Action>) { }

  selectedPoint(initState: any = null): Observable<any> {
    return this.actions.scan((state, action) => {
      if (action instanceof SelectMapPointAction) {
        return action.lngLat;
      }

      return state;
    }, initState);
  }

}
