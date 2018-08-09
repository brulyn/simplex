import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import { CategoryModel } from './categories.model';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<CategoryModel> = new Subject();
  categories: CategoryModel[] = [];
  constructor(public http: Http) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.http.get('http://localhost:3000/simplex_api/categories')
      .map(this.extractData)
      .subscribe(categories => {
        this.dtTrigger.next();
        this.categories = categories;
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
