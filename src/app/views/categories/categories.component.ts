import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject, Observable, Subscription } from 'rxjs';
import { CategoryModel } from './categories.model';
import { MainServiceService } from '../../main-service.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [MainServiceService]
})
export class CategoriesComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<CategoryModel> = new Subject();
  categories: CategoryModel[] = [];
  shops = [];
  in_adding = false;
  in_updating = false;
  servObsd = new Subscription();
  category = {
    _id: '',
    name: '',
    shop_id: ''
  };
  name = '';
  shop_id = '';
  constructor(public http: Http, public service: MainServiceService) { }

  ngOnInit() {
    this.categories = [];
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.servObsd = this.service.getCategories()
      .map(this.extractData)
      .subscribe(st => {
        this.dtTrigger.next();
        this.categories = st;
      });

    this.service.getShops()
      .map(this.extractData)
      .subscribe(shops => {
        this.shops = shops;
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
    this.shop_id = '';
  }

  public submit() {
    const category = {
      name: this.name,
      shop_id: this.shop_id
    };
    this.service.createCategory(
      category
    ).subscribe(st => {
      this.adding();
    });
  }

  public delete(id) {
    this.service.deleteCategory(id)
      .subscribe(st => {
        this.dtTrigger = new Subject();
        this.service.getCategories()
          .map(this.extractData)
          .subscribe(strs => {
            this.dtTrigger.next();
            this.categories = strs;
            this.refresh();
            // Calling the DT trigger to manually render the table
          });
      });
  }

  public updating(category) {
    this.name = category.name;
    this.shop_id = category.shop_id;

    this.category = category;
    this.in_updating = !this.in_updating;
    // this.dtTrigger = new Subject();
    // this.ngOnInit();
  }

  public submit_update() {
    const id = this.category._id;
    const values = {
      name: this.name,
      shop_id: this.shop_id
    };

    this.service.updateCategory(id, values)
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
