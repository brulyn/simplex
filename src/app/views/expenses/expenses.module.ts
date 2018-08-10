import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { ExpensesComponent } from './expenses.component';
import { ExpensesRoutingModule } from './expenses-routing.module';

import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    FormsModule,
    ExpensesRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    DataTablesModule,
    HttpModule,
    CommonModule
  ],
  declarations: [ ExpensesComponent ]
})
export class ExpensesModule { }
