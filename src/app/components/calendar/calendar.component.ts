import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { addMonth } from '../../store/actions/calendar.actions';
import { CalendarState } from '../../store/reducers/calendar.reducer';
import { AppState } from '../../store/app.metareducer';
import { setCurrentMonth } from '../../store/actions/month.actions';
import { MonthState } from '../../store/reducers/month.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit, OnDestroy {

  daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  calendarStateSubscription: Subscription;
  monthStateSubscription: Subscription;
  numberOfDaysPerMonth: number;
  days: DayInformation[] = [];
  numberOfelements = 35;
  monthMap: Object = {};
  daysMap: Object;
  month: string;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.calendarStateSubscription = this.store.select('calendarState').subscribe((store: CalendarState) => {
      this.month = store.currentMonthName;
      this.init(store.monthMap);
      this.store.dispatch(setCurrentMonth({ monthReference: this.month, daysMap: this.monthMap[this.month] }));
    });
    this.monthStateSubscription = this.store.select('monthState').subscribe((store: MonthState) => {
      this.daysMap = store.currentMonth.daysMap;
    });
  }

  ngOnDestroy() {
    this.calendarStateSubscription.unsubscribe();
    this.monthStateSubscription.unsubscribe();
  }

  init(monthMap: Object) {
    if (!monthMap[this.month]) {
      this.monthMap[this.month] = {};
      this.numberOfDaysPerMonth = moment(this.month, 'YYYY-MM').daysInMonth();
      this.days = [];
      this.generateDaysOfMonth();
      this.store.dispatch(addMonth({ monthReference: this.month, daysMap: this.monthMap[this.month] }));
    }
  }

  generateDaysOfMonth() {
    const firstDayOfMonth = moment(this.month).startOf('month');
    for (let i = 0; i < this.numberOfDaysPerMonth; i++) {
      this.days.push(this.generateDayAfter(firstDayOfMonth, i, 'text-dark'));
    }
    this.addComplements(firstDayOfMonth);
    this.generateDaysMap();
  }

  addComplements(firstDayOfMonth) {
    const numberOfDaysBefore = this.calculateDiference(this.days[0].referenceDate);
    const numberOfDaysAfter = (this.daysOfWeek.length - 1) - this.calculateDiference(this.days[this.days.length - 1].referenceDate);
    for (let i = 1; i <= numberOfDaysBefore; i++) {
      this.days.unshift(this.generateDayBefore(firstDayOfMonth, i, 'text-muted'));
    }

    for (let i = 0; i <= numberOfDaysAfter; i++) {
      this.days.push(this.generateDayAfter(firstDayOfMonth, i + this.numberOfDaysPerMonth, 'text-muted'));
    }
  }

  calculateDiference(referenceDate) {
    const dayName = referenceDate.split('-')[1];
    const index = this.daysOfWeek.indexOf(dayName);
    return index;
  }

  generateDayAfter(firstDayOfMonth, index: number, color: string): DayInformation {
    const referenceDate = moment(firstDayOfMonth).add(index, 'day').format('DD-dddd');
    const completeTime = moment(firstDayOfMonth).add(index, 'day').format('YYYY-MM-DD');
    return this.genrerateDay(referenceDate, completeTime, color)
  }

  generateDayBefore(firstDayOfMonth, index: number, color: string): DayInformation {
    const referenceDate = moment(firstDayOfMonth).subtract(index, 'day').format('DD-dddd');
    const completeTime = moment(firstDayOfMonth).subtract(index, 'day').format('YYYY-MM-DD');
    return this.genrerateDay(referenceDate, completeTime, color)
  }

  genrerateDay(referenceDate: string, completeTime: any, color: string): DayInformation {
    return {
      completeTime,
      referenceDate,
      numberDay: referenceDate.split('-')[0],
      color,
      backgroundColor: 'white',
      utilizable: true,
      reminders: []
    };
  }

  generateDaysMap() {
    const map = this.monthMap[this.month];
    for (let day of this.days) {
      const daySplit = day.referenceDate.split('-');
      this.changeBackgroundColor(day, daySplit[1]);
      if (map[daySplit[1]]) {
        map[daySplit[1]].push(day);
      } else {
        map[daySplit[1]] = []
        map[daySplit[1]].push(day);
      }
    }
  }

  changeBackgroundColor(day: DayInformation, dayOfWeek: string) {
    if (dayOfWeek === 'Sunday' || dayOfWeek === 'Saturday') {
      day.backgroundColor = 'bg-light';
      if (day.color !== 'text-muted') {
        day.color = 'text-primary';
      }
    }
    if (moment(day.completeTime) < moment(moment().format('YYYY-MM-DD'))) {
      day.utilizable = false;
    }
  }
}

