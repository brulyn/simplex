import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import { ProductModel } from './products.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import { flatMap } from 'rxjs/operators';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<ProductModel> = new Subject();
  products = [];
  constructor(public http: Http, public http2: Http) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.http.get('http://localhost:3000/simplex_api/products')
      .map(this.extractData)
      .subscribe(products => {
        this.products = products;
        this.dtTrigger.next();
        // Calling the DT trigger to manually render the table
      });

    // const c = this.http.get('http://localhost:3000/simplex_api/products')
    //   .map(this.extractData);

    // c.subscribe(p => {
    //   console.log(p);
    // });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.result || body || {};
  }

}
