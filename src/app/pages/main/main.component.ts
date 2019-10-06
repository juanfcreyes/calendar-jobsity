import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  viewDate = new Date();
  now = moment().format('YYYY-MM');
  selectedMonth = moment().format('YYYY-MM');
  viewMomth = moment().format('YYYY MMMM');

  ngOnInit(): void {}

  incrementMonth() {
    this.selectedMonth = moment(this.selectedMonth).add(1, 'month').format('YYYY-MM');
    this.viewMomth = moment(this.selectedMonth).format('YYYY MMMM');
  }

  decrementMonth() {
    if (this.now != this.selectedMonth) {
      this.selectedMonth = moment(this.selectedMonth).subtract(1, 'month').format('YYYY-MM');
      this.viewMomth = moment(this.selectedMonth).format('YYYY MMMM');
    }
  }



}
