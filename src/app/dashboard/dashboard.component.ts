import { Component, Inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import {
  Action,
  AppState,
  AuthService,
  ClearSelectedMapPointAction,
  LoginSuccessAction,
  LogoutAction,
  SelectMapPointAction,
  dispatcher,
  state
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
  private paramsSub: Subscription;
  private stateSub: Subscription;

  constructor(
    private authService: AuthService,
    @Inject(dispatcher) private dispatcher: Observer<Action>,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(state) private state: Observable<AppState>
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe((params: any) => {
      if (params.x && params.y) this.mapCenter = { longitude: +params.x, latitude: +params.y };
      if (params.z) this.mapZoom = +params.z;
    });

    this.stateSub = this.state.subscribe((appState: AppState) => {
      this.authenticated = appState.auth.authenticated;
      this.selectedMapPoint = appState.map.selectedPoint;
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.stateSub.unsubscribe();
  }

  onCloseInfoPopup() {
    this.clearSelectedMapPoint();
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.dispatcher.next(new LogoutAction());
  }

  onMapClick(event) {
    this.toggleSelectedMapPoint(event.lngLat);
  }

  onMapMoveend(mapProperties) {
    this.clearSelectedMapPoint();

    const newParams = {
      x: mapProperties.center.lng,
      y: mapProperties.center.lat,
      z: mapProperties.zoom.toFixed(2)
    };

    const route = this.route.snapshot.firstChild.url.map(url => url.path);

    this.router.navigate(['.', newParams, ...route]);
  }

  private clearSelectedMapPoint() {
    this.dispatcher.next(new ClearSelectedMapPointAction());
  }

  private toggleSelectedMapPoint(lngLat) {
    this.dispatcher.next(this.selectedMapPoint ? new ClearSelectedMapPointAction() : new SelectMapPointAction(lngLat));
  }

}
