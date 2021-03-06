import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import {
  AuthService,
  ClearSelectedMapPointAction,
  LogoutAction,
  ReverseGeocodePointAction,
  SelectMapPointAction,
  SelectPlaceAction,
  SetMapViewAction,
  State,
  getSelectedPlace
} from '../core';

@Component({
  selector: 'ttd-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private authenticated: boolean = false;
  private userProfile: any;
  private infoPopupOpen: boolean = false;
  private mapCenter: any = { longitude: -105.0, latitude: 39.0 };
  private mapZoom: number = 5;
  private selectedMapPoint: any;
  private selectedMapPointGeoJson: any;
  private selectedPlace: any;

  // Subscriptions
  private authSub: Subscription;
  private mapSub: Subscription;
  private paramsSub: Subscription;

  constructor(
    private authService: AuthService,
    private ref: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe((params: any) => {
      this.clearSelectedMapPoint();

      if (params.x && params.y && params.z) {
        this.store.dispatch(new SetMapViewAction({
          center: { lng: +params.x, lat: +params.y } as mapboxgl.LngLat,
          zoom: +params.z
        }));
      }
    });

    this.authSub = this.store
      .select('auth')
      .subscribe((auth: any) => {
        this.authenticated = auth.authenticated;
        this.userProfile = auth.authenticated ? auth.user.profile : undefined;
      });

    this.mapSub = this.store
      .select('map')
      .subscribe((map: any) => {
        this.selectedMapPoint = map.selectedPoint;
        this.selectedMapPointGeoJson = this.getFeatureCollection(this.toGeoJson(map.selectedPoint));
        this.mapCenter = map.center;
        this.mapZoom = map.zoom;
        this.ref.detectChanges();
      });

    this.selectedPlace = this.store.let(getSelectedPlace);
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.mapSub.unsubscribe();
  }

  onCloseInfoPopup() {
    this.clearSelectedMapPoint();
  }

  onCreateEvent(placeName: string, point: mapboxgl.LngLat) {
    this.router.navigate(['/dashboard/events/new', { place: placeName, x: point.lng, y: point.lat }]);
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
    const newParams = {
      x: mapProperties.center.lng,
      y: mapProperties.center.lat,
      z: mapProperties.zoom.toFixed(2)
    };

    const route = this.flatten(this.route.snapshot.firstChild.url.map(url => [url.path, url.parameters]));

    this.router.navigate(['.', newParams, ...route], { replaceUrl: true });
  }

  private clearSelectedMapPoint() {
    this.store.dispatch(new ClearSelectedMapPointAction());
  }

  private flatten(value) {
    return [].concat.apply([], value);
  }

  private getFeatureCollection(geometry) {
    return { type: 'FeatureCollection', features: this.getFeatures(geometry) };
  }

  private getFeatures(geometry) {
    return geometry ? [{ type: 'Feature', geometry }] : [];
  }

  private toGeoJson(coords) {
    if (!coords) return;
    return { type: 'Point', coordinates: [coords.lng, coords.lat] };
  }

  private toggleSelectedMapPoint(lngLat) {
    if (this.selectedMapPoint) {
      this.clearSelectedMapPoint();
    } else {
      this.store.dispatch(new SelectMapPointAction(lngLat));
      this.store.dispatch(new ReverseGeocodePointAction(lngLat));
      this.store.dispatch(new SelectPlaceAction(lngLat));
    }
  }

}
