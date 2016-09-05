import { Injectable } from '@angular/core';
import {
  Http,
  Response,
  RequestOptions,
  URLSearchParams
} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const mapboxgl = window['mapboxgl'];
const API = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

@Injectable()
export class GeocoderService {

  constructor(private http: Http) { }

  geocode(query: string) {
    const searchParams = new URLSearchParams();
    searchParams.set('access_token', mapboxgl.accessToken);

    const requestOptions = new RequestOptions({
      search: searchParams
    });

    return this.http.get(this.formatUri(query), requestOptions)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(response: Response) {
    return response.json();
  }

  private formatUri(query: string) {
    return `${API}${query.trim()}.json`;
  }

  private handleError(error: any) {
    console.error(error);
    const errorMessage = 'Service unavailable - please try again in a few minutes';
    return Observable.throw(errorMessage);
  }

}
