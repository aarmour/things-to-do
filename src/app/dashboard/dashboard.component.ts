import { Component, Inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../core/app-state/models/app-state.model';
import {
  AuthService,
  ClearSelectedMapPointAction,
  LogoutAction,
  SelectMapPointAction,
  SetMapCenterAction
} from '../core';

@Component({
  selector: 'ttd-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private authenticated: boolean = false;
  private infoPopupOpen: boolean = false;
  private mapCenter: any = { longitude: -105.0, latitude: 39.0 };
  private mapZoom: number = 5;
  private selectedMapPoint: any;

  // Subscriptions
  private authSub: Subscription;
  private mapSub: Subscription;
  private paramsSub: Subscription;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe((params: any) => {
      if (params.x && params.y) this.mapCenter = { longitude: +params.x, latitude: +params.y };
      if (params.z) this.mapZoom = +params.z;
    });

    this.authSub = this.store
      .select('auth')
      .subscribe((auth: any) => this.authenticated = auth.authenticated);

    this.mapSub = this.store
      .select('map')
      .subscribe((map: any) => this.selectedMapPoint = map.selectedPoint);
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.mapSub.unsubscribe();
  }

  onCloseInfoPopup() {
    this.clearSelectedMapPoint();
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.store.dispatch(new LogoutAction());
  }

  onMapClick(event) {
    this.toggleSelectedMapPoint(event.lngLat);
  }

  onMapMoveend(mapProperties) {
    this.clearSelectedMapPoint();
    this.store.dispatch(new SetMapCenterAction(mapProperties.center));

    const newParams = {
      x: mapProperties.center.lng,
      y: mapProperties.center.lat,
      z: mapProperties.zoom.toFixed(2)
    };

    const route = this.route.snapshot.firstChild.url.map(url => url.path);

    this.router.navigate(['.', newParams, ...route]);
  }

  private clearSelectedMapPoint() {
    this.store.dispatch(new ClearSelectedMapPointAction());
  }

  private toggleSelectedMapPoint(lngLat) {
    const action = this.selectedMapPoint ? new ClearSelectedMapPointAction() : new SelectMapPointAction(lngLat);
    this.store.dispatch(action);
  }

}
