import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject, Observable, Subscription } from 'rxjs';
import { ExpenseModel } from './expenses.model';
import { MainServiceService } from '../../main-service.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  providers: [MainServiceService]
})
export class ExpensesComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<ExpenseModel> = new Subject();
  expenses: ExpenseModel[] = [];
  in_adding = false;
  in_updating = false;
  servObsd = new Subscription();
  expense = {
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
    this.expenses = [];
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.servObsd = this.service.getExpenses()
      .map(this.extractData)
      .subscribe(st => {
        this.dtTrigger.next();
        this.expenses = st;
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
    const expense = {
      name: this.name,
      address: this.address,
      telephone: this.telephone,
      manager: this.manager,
      shop_id: this.shop_id
    };
    this.service.createExpense(
      expense
    ).subscribe(st => {
      this.adding();
    });
  }

  public delete(id) {
    this.service.deleteExpense(id)
      .subscribe(st => {
        this.dtTrigger = new Subject();
        this.service.getExpenses()
          .map(this.extractData)
          .subscribe(strs => {
            this.dtTrigger.next();
            this.expenses = strs;
            this.refresh();
            // Calling the DT trigger to manually render the table
          });
      });
  }

  public updating(expense) {
    this.name = expense.name;
    this.address = expense.address;
    this.telephone = expense.telephone;
    this.shop_id = expense.shop_id;
    this.manager = expense.manager;

    this.expense = expense;
    this.in_updating = !this.in_updating;
    // this.dtTrigger = new Subject();
    // this.ngOnInit();
  }

  public submit_update() {
    const id = this.expense._id;
    const values = {
      name: this.name,
      address: this.address,
      telephone: this.telephone,
      manager: this.manager,
      shop_id: this.shop_id
    };

    this.service.updateExpense(id, values)
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
