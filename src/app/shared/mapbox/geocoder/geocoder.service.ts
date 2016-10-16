import { Injectable } from '@angular/core';
import {
  Http,
  Response,
  RequestOptions,
  URLSearchParams
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

const mapboxgl = window['mapboxgl'];
const API = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

@Injectable()
export class GeocoderService {

  constructor(private http: Http) { }

  geocode(query: string) {
    return this.makeRequest(query);
  }

  reverseGeocode(point: mapboxgl.LngLat) {
    return this.makeRequest(point);
  }

  private extractData(response: Response) {
    return response.json();
  }

  private formatPointQuery(point: mapboxgl.LngLat) {
    return point.toArray().join(',');
  }

  private formatUri(query: string) {
    return `${API}${query.trim()}.json`;
  }

  private handleError(error: any) {
    console.error(error);
    const errorMessage = 'Service unavailable - please try again in a few minutes';
    return Observable.throw(errorMessage);
  }

  private makeRequest(query) {
    const searchParams = new URLSearchParams();
    searchParams.set('access_token', mapboxgl.accessToken);

    const requestOptions = new RequestOptions({
      search: searchParams
    });

    if (query instanceof mapboxgl.LngLat) {
      query = this.formatPointQuery(query) as string;
    }

    return this.http.get(this.formatUri(query), requestOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

}
