import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnChanges {

  @Input() month: string;
  monthMap: Object = {};
  daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  numberOfDaysPerMonth: number;
  numberOfelements = 35;
  days: DayInformation[] = [];
  
  constructor() { }

  ngOnChanges() {
    if (!this.monthMap[this.month]) {
      this.monthMap[this.month] = {};
      this.numberOfDaysPerMonth = moment(this.month, 'YYYY-MM').daysInMonth();
      this.days = [];
      this.generateDaysOfMonth();
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

  generateDayBefore(firstDayOfMonth, index: number, color: string) : DayInformation {
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
      if(map[daySplit[1]]) {
        map[daySplit[1]].push(day);
      } else {
        map[daySplit[1]] = []
        map[daySplit[1]].push(day);
      }
    }
  }

  changeBackgroundColor(day: DayInformation, dayOfWeek: string) {
    if(dayOfWeek === 'Sunday' ||  dayOfWeek === 'Saturday') {
      day.backgroundColor = 'bg-light';
      if(day.color !== 'text-muted') {
        day.color = 'text-primary';
      }
    }
    if (moment(day.completeTime) < moment(moment().format('YYYY-MM-DD'))) {
      day.utilizable = false;
    }
  }
}

