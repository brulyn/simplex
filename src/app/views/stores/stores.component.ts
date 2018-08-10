import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject, Observable, Subscription } from 'rxjs';
import { StoreModel } from './stores.model';
import { MainServiceService } from '../../main-service.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
  providers: [MainServiceService]
})
export class StoresComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<StoreModel> = new Subject();
  stores: StoreModel[] = [];
  in_adding = false;
  in_updating = false;
  shops = [];
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
    this.stores = [];
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.servObsd = this.service.getStores()
      .map(this.extractData)
      .subscribe(st => {
        this.dtTrigger.next();
        this.stores = st;
      });

    this.service.getShops()
      .map(this.extractData)
      .subscribe(st => {
        this.shops = st;
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
    this.service.createStore(
      store
    ).subscribe(st => {
      this.adding();
    });
  }

  public delete(id) {
    this.service.deleteStore(id)
      .subscribe(st => {
        this.dtTrigger = new Subject();
        this.service.getStores()
          .map(this.extractData)
          .subscribe(strs => {
            this.dtTrigger.next();
            this.stores = strs;
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

    this.service.updateStore(id, values)
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
