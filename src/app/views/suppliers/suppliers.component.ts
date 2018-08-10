import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject, Observable, Subscription } from 'rxjs';
import { SupplierModel } from './suppliers.model';
import { MainServiceService } from '../../main-service.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss'],
  providers: [MainServiceService]
})
export class SuppliersComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<SupplierModel> = new Subject();
  suppliers: SupplierModel[] = [];
  in_adding = false;
  in_updating = false;
  servObsd = new Subscription();
  supplier = {
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
    this.suppliers = [];
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.servObsd = this.service.getSuppliers()
      .map(this.extractData)
      .subscribe(st => {
        this.dtTrigger.next();
        this.suppliers = st;
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
    const supplier = {
      name: this.name,
      address: this.address,
      telephone: this.telephone,
      manager: this.manager,
      shop_id: this.shop_id
    };
    this.service.createSupplier(
      supplier
    ).subscribe(st => {
      this.adding();
    });
  }

  public delete(id) {
    this.service.deleteSupplier(id)
      .subscribe(st => {
        this.dtTrigger = new Subject();
        this.service.getSuppliers()
          .map(this.extractData)
          .subscribe(strs => {
            this.dtTrigger.next();
            this.suppliers = strs;
            this.refresh();
            // Calling the DT trigger to manually render the table
          });
      });
  }

  public updating(supplier) {
    this.name = supplier.name;
    this.address = supplier.address;
    this.telephone = supplier.telephone;
    this.shop_id = supplier.shop_id;
    this.manager = supplier.manager;

    this.supplier = supplier;
    this.in_updating = !this.in_updating;
    // this.dtTrigger = new Subject();
    // this.ngOnInit();
  }

  public submit_update() {
    const id = this.supplier._id;
    const values = {
      name: this.name,
      address: this.address,
      telephone: this.telephone,
      manager: this.manager,
      shop_id: this.shop_id
    };

    this.service.updateSupplier(id, values)
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
