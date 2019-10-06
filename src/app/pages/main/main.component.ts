import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { CalendarState } from '../../store/reducers/calendar.reducer';
import { setCurrentMonthName } from '../../store/actions/calendar.actions';
import { AppState } from '../../store/app.metareducer';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private store: Store<AppState>) {}


  viewDate = new Date();
  now = moment().format('YYYY-MM');
  selectedMonth = moment().format('YYYY-MM');
  viewMomth = moment().format('YYYY MMMM');

  ngOnInit(): void {
    this.store.dispatch(setCurrentMonthName({monthName: this.selectedMonth}));
  }

  incrementMonth() {
    this.selectedMonth = moment(this.selectedMonth).add(1, 'month').format('YYYY-MM');
    this.viewMomth = moment(this.selectedMonth).format('YYYY MMMM');
    this.store.dispatch(setCurrentMonthName({monthName: this.selectedMonth}));
  }

  decrementMonth() {
    if (this.now != this.selectedMonth) {
      this.selectedMonth = moment(this.selectedMonth).subtract(1, 'month').format('YYYY-MM');
      this.viewMomth = moment(this.selectedMonth).format('YYYY MMMM');
      this.store.dispatch(setCurrentMonthName({monthName: this.selectedMonth}));
    }
  }



}
