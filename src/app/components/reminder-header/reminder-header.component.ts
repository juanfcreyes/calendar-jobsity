import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reminder-header',
  templateUrl: './reminder-header.component.html',
  styleUrls: ['./reminder-header.component.css']
})
export class ReminderHeaderComponent implements OnInit {

  @Input() reminder: Reminder;
  @Output() onDeleteReminder: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEditReminder: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  deleteReminder() {
    this.onDeleteReminder.emit();
  }

  editReminder() {
    this.onEditReminder.emit();
  }

}
