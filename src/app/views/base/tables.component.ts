import { Component, OnInit } from '@angular/core';


@Component({
  templateUrl: 'tables.component.html'
})
export class TablesComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

}
