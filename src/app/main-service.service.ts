import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  end_point_online = 'https://vast-dawn-75785.herokuapp.com';
  end_point_local = 'http://localhost:3000';
  end_point = this.end_point_online;
  constructor(private _http: Http) { }

  public getStores() {
    const url = this.end_point + '/api/stores';
    return this._http.get(url);
  }

  public createStore(store) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const url = this.end_point + '/api/stores/';
    return this._http.post(url, store, options);
  }

  public deleteStore(id) {
    const url = this.end_point + '/api/stores/' + id;
    return this._http.delete(url);
  }

  public updateStore(id, store) {
    const url = this.end_point + '/api/stores/' + id
      + '?name=' + store.name
      + '&address=' + store.address
      + '&telephone=' + store.telephone
      + '&shop_id=' + store.shop_id
      + '&manager=' + store.manager;
    return this._http.put(url, {});
  }
}
