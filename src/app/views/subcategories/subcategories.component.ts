import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import { SubcategoryModel } from './subcategories.model';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss']
})
export class SubcategoriesComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<SubcategoryModel> = new Subject();
  subcategories: SubcategoryModel[] = [];
  constructor(public http: Http) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.http.get('http://localhost:3000/simplex_api/subcategories')
      .map(this.extractData)
      .subscribe(subcategories => {
        this.dtTrigger.next();
        this.subcategories = subcategories;
        // Calling the DT trigger to manually render the table
      });
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
