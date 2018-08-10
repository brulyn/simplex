import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject, Observable, Subscription } from 'rxjs';
import { SubcategoryModel } from './subcategories.model';
import { MainServiceService } from '../../main-service.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss'],
  providers: [MainServiceService]
})
export class SubcategoriesComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<SubcategoryModel> = new Subject();
  subcategories: SubcategoryModel[] = [];
  categories = [];
  in_adding = false;
  in_updating = false;
  servObsd = new Subscription();
  subcategory = {
    _id: '',
    name: '',
    category_id: ''
  };
  name = '';
  category_id = '';
  constructor(public http: Http, public service: MainServiceService) { }

  ngOnInit() {
    this.subcategories = [];
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.servObsd = this.service.getSubcategories()
      .map(this.extractData)
      .subscribe(st => {
        this.dtTrigger.next();
        this.subcategories = st;
      });

    this.service.getCategories()
      .map(this.extractData)
      .subscribe(categories => {
        this.categories = categories;
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
    this.category_id = '';
  }

  public submit() {
    const subcategory = {
      name: this.name,
      category_id: this.category_id
    };
    this.service.createSubcategory(
      subcategory
    ).subscribe(st => {
      this.adding();
    });
  }

  public delete(id) {
    this.service.deleteSubcategory(id)
      .subscribe(st => {
        this.dtTrigger = new Subject();
        this.service.getSubcategories()
          .map(this.extractData)
          .subscribe(strs => {
            this.dtTrigger.next();
            this.subcategories = strs;
            this.refresh();
            // Calling the DT trigger to manually render the table
          });
      });
  }

  public updating(subcategory) {
    this.name = subcategory.name;
    this.category_id = subcategory.category_id;

    this.subcategory = subcategory;
    this.in_updating = !this.in_updating;
    // this.dtTrigger = new Subject();
    // this.ngOnInit();
  }

  public submit_update() {
    const id = this.subcategory._id;
    const values = {
      name: this.name,
      category_id: this.category_id
    };

    this.service.updateSubcategory(id, values)
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
