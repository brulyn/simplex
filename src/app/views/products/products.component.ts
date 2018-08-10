import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject, Observable, Subscription } from 'rxjs';
import { ProductModel } from './products.model';
import { MainServiceService } from '../../main-service.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [MainServiceService]
})
export class ProductsComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<ProductModel> = new Subject();
  products: ProductModel[] = [];
  in_adding = false;
  in_updating = false;
  servObsd = new Subscription();
  product = {
    _id: '',
    name: '',
    address: '',
    telephone: '',
    shop_id: ''
  };
  name = '';
  address = '';
  telephone = '';
  manager = '';
  shop_id = '';
  constructor(public http: Http, public service: MainServiceService) { }

  ngOnInit() {
    this.products = [];
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.servObsd = this.service.getProducts()
      .map(this.extractData)
      .subscribe(st => {
        this.dtTrigger.next();
        this.products = st;
      });

  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.servObsd.unsubscribe();
  }
  private extractData(res: Response) {
    const body = res.json();
    return body.result || body || {};
  }
  public adding() {
    this.in_adding = !this.in_adding;
    this.dtTrigger = new Subject();
    this.ngOnInit();
    this.name = '';
    this.address = '';
    this.telephone = '';
    this.shop_id = '';
    this.manager = '';
  }

  public submit() {
    const product = {
      name: this.name,
      address: this.address,
      telephone: this.telephone,
      manager: this.manager,
      shop_id: this.shop_id
    };
    this.service.createProduct(
      product
    ).subscribe(st => {
      this.adding();
    });
  }

  public delete(id) {
    this.service.deleteProduct(id)
      .subscribe(st => {
        this.dtTrigger = new Subject();
        this.service.getProducts()
          .map(this.extractData)
          .subscribe(strs => {
            this.dtTrigger.next();
            this.products = strs;
            this.refresh();
            // Calling the DT trigger to manually render the table
          });
      });
  }

  public updating(product) {
    this.name = product.name;
    this.address = product.address;
    this.telephone = product.telephone;
    this.shop_id = product.shop_id;
    this.manager = product.manager;

    this.product = product;
    this.in_updating = !this.in_updating;
    // this.dtTrigger = new Subject();
    // this.ngOnInit();
  }

  public submit_update() {
    const id = this.product._id;
    const values = {
      name: this.name,
      address: this.address,
      telephone: this.telephone,
      manager: this.manager,
      shop_id: this.shop_id
    };

    this.service.updateProduct(id, values)
      .subscribe(st => {
        this.in_updating = !this.in_updating;
        this.dtTrigger = new Subject();
        this.ngOnInit();
      });


  }

  public cancel_update() {
    this.in_updating = !this.in_updating;
    this.dtTrigger = new Subject();
    this.ngOnInit();
  }

  public refresh() {
    this.adding();
    this.adding();
  }


}
