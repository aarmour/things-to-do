import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  moduleId: module.id,
  selector: 'ttd-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private paramsSub: Subscription;
  private mapCenter: any = { longitude: -105.0, latitude: 39.0 };
  private mapZoom: number = 5;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe((params: any) => {
      if (params.x && params.y) this.mapCenter = { longitude: +params.x, latitude: +params.y };
      if (params.z) this.mapZoom = +params.z;
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }

  private onMapMoveend(mapProperties) {
    const newParams = {
      x: mapProperties.center.lng,
      y: mapProperties.center.lat,
      z: mapProperties.zoom.toFixed(2)
    };

    const route = this.route.snapshot.firstChild.url.map(url => url.path);

    this.router.navigate(['.', newParams, ...route]);
  }

}
