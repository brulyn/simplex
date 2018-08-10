import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject, Observable, Subscription } from 'rxjs';
import { SalesModel } from './sales.model';
import { MainServiceService } from '../../main-service.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
  providers: [MainServiceService]
})
export class SalesComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<SalesModel> = new Subject();
  sales: SalesModel[] = [];
  in_adding = false;
  in_updating = false;
  servObsd = new Subscription();
  store = {
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
    this.sales = [];
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.servObsd = this.service.getSales()
      .map(this.extractData)
      .subscribe(st => {
        this.dtTrigger.next();
        this.sales = st;
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
    const store = {
      name: this.name,
      address: this.address,
      telephone: this.telephone,
      manager: this.manager,
      shop_id: this.shop_id
    };
    this.service.createSale(
      store
    ).subscribe(st => {
      this.adding();
    });
  }

  public delete(id) {
    this.service.deleteSale(id)
      .subscribe(st => {
        this.dtTrigger = new Subject();
        this.service.getSales()
          .map(this.extractData)
          .subscribe(strs => {
            this.dtTrigger.next();
            this.sales = strs;
            this.refresh();
            // Calling the DT trigger to manually render the table
          });
      });
  }

  public updating(store) {
    this.name = store.name;
    this.address = store.address;
    this.telephone = store.telephone;
    this.shop_id = store.shop_id;
    this.manager = store.manager;

    this.store = store;
    this.in_updating = !this.in_updating;
    // this.dtTrigger = new Subject();
    // this.ngOnInit();
  }

  public submit_update() {
    const id = this.store._id;
    const values = {
      name: this.name,
      address: this.address,
      telephone: this.telephone,
      manager: this.manager,
      shop_id: this.shop_id
    };

    this.service.updateSale(id, values)
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
